import React from 'react'
import ReactDOM from 'react-dom'
import { StylesProvider, jssPreset } from '@material-ui/styles'
import { create } from 'jss'
import './content.css'
import { arrive, departWatch } from '../utils/domwatch.js'

(async function main() {
  await render()
  departWatch(render, '#redpill-root')
})()

async function render() {
  const [main] = await arrive('section > main')
  const mainFirstChild = main.firstChild
  const mainHeader = main.querySelector('header')
  const mainHeaderUserAvatar = mainHeader.querySelector('img[data-testid="user-avatar"]')
  let container, sibling, className
  const { location } = window
  if (location.href === 'https://www.binance.com/') {
    // we're on the main page
    container = mainFirstChild.firstChild
    sibling = container.firstChild.nextSibling
    className = container.firstChild.className
  } else if (mainHeaderUserAvatar || ~location.pathname.indexOf(`/${username}`)) {
    // we're on profile page (either somebody's or our account)
    container = mainFirstChild
    sibling = container.firstChild.nextSibling
    className = ''
  } else {
    // we're on another page
    container = main
    sibling = container.firstChild
    className = mainFirstChild.className
  }

  // $('button').forEach(function(button) {
  //   if (!button.innerText.toLowerCase().includes('sell')) return;
  //   button.innerHTML = 'Chat with friends'
  //   const $button = $(button);
  //   const span = $button.find('.MuiButton-label span')
  // })

  const root = document.createElement('div')
  root.id = 'redpill-root'
  root.className = className
  container.insertBefore(root, sibling)
  const shadowRootContainer = root.appendChild(document.createElement('div'))
  const shadowRoot = shadowRootContainer.attachShadow({ mode: 'closed' })
  const shadowMountPoint = shadowRoot.appendChild(document.createElement('div'))
  const styleLink = shadowRoot.appendChild(document.createElement('link'))
  shadowMountPoint.id = 'redpill-react-root'
  styleLink.rel = 'stylesheet'
  styleLink.type = 'text/css'
  styleLink.href = chrome.extension.getURL('contentScript.css')
  const jss = create({ ...jssPreset(), insertionPoint: shadowMountPoint })
  const frame = React.createElement(Frame, { key: 'frame' }, null)
  const styles = React.createElement(StylesProvider, { jss, key: 'styles' }, [frame])
  ReactDOM.render(styles, shadowMountPoint)
  return true
}
