import React from 'react'
import ReactDOM from 'react-dom'
import { from, of, concat } from 'rxjs'
import { filter, mergeMap, pluck, take, tap } from 'rxjs/operators'
import { ChatWithFriends } from '../components/ChatWithFriends.jsx'
import { isButton, removeChildren } from './dom.js'
import { fromMutationObserver, tag } from './rxjs.js'

export function getFTXMatchers() {
  return [
    {
      // https://ftx.com/trade/BTC/USDT
      // https://ftx.com/trade/BTC-PERP
      regexp: new RegExp('https://ftx.com/trade/(?<symbol>.+)', 'g'),
      handler: initFTXPage,
    },
  ]
}

export async function initFTXPage(params) {
  appendFTXStyle()
  concat(
    getButtonsFromDOM(),
    getButtonsFromMutationObserver(),
  )
    .pipe(
      tag('initFTXPage'),
      filter(button => button.innerHTML.toLowerCase().includes('sell')),
      tap(console.log.bind(console, 'sell button')),
    )
    .subscribe(button => {
      if (button.redpilled) return
      const spans = Array.from(button.querySelectorAll('span')).filter(span => span.innerText.toLowerCase() === 'sell')
      if (!spans.length) return
      button.innerHTML = 'Chat with friends'
      button.className += ' ftx-sell-button'
      button.removeAttribute('disabled')
      button.addEventListener('click', (e) => {
        e.stopPropagation()
        e.preventDefault()
        window.location.href = 'https://www.reddit.com/'
      })
      button.redpilled = true
    })
}

export function getButtonsFromDOM() {
  return from(document.querySelectorAll('button')).pipe(tag('getButtonsFromDOM'))
}

export function getButtonsFromMutationObserver() {
  return fromMutationObserver(document.body, { subtree: true, childList: true })
    .pipe(
      tag('getButtonsFromMutationObserver'),
      filter(record => record.addedNodes && record.addedNodes.length > 0),
      pluck('addedNodes'),
      mergeMap((addedNodes) => from(nodes2buttons(addedNodes))),
    )
}

export function nodes2buttons(nodes) {
  let buttons = []
  for (const node of nodes) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) continue
    if (isButton(node)) {
      buttons.push(node)
    } else {
      buttons = buttons.concat(Array.from(node.querySelectorAll('button')))
    }
  }
  return buttons
}

export async function changeFTXButton(button) {
  removeChildren(button)
  const root = button.appendChild(document.createElement('div'))
  const label = React.createElement(ChatWithFriends, {}, null)
  ReactDOM.render(label, root)
}

export function appendFTXStyle() {
  const style = document.createElement('style')
  style.innerHTML = '.ftx-sell-button {color: #FFFFFF !important; background-color: #00B4C9 !important; cursor: pointer !important;}'
  document.body.appendChild(style)
}
