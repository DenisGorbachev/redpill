import { of } from 'rxjs'
import { filter, mergeMap, pluck, take, tap } from 'rxjs/operators'
import React from 'react'
import ReactDOM from 'react-dom'
import { StylesProvider, jssPreset } from '@material-ui/styles'
import { create } from 'jss'
import './content.css'
import { arrive, departWatch } from '../utils/domwatch.js'
import { getFTXMatchers } from '../utils/ftx.js'
import { fromMutationObserver } from '../utils/rxjs.js'

/**
 * @global chrome
 */

(async function main() {
  await render()
})()

async function render() {
  for (const { regexp, handler } of getMatchers()) {
    const matches = window.location.href.matchAll(regexp)
    const { value: match } = matches.next()
    if (match) {
      await handler(match.groups)
      break
    }
  }
}

function getMatchers() {
  return Array.prototype.concat(getFTXMatchers())
}

async function renderRoot(children) {
  const root = document.createElement('div')
  root.id = 'redpill-root'
  const shadowRootContainer = root.appendChild(document.createElement('div'))
  const shadowRoot = shadowRootContainer.attachShadow({ mode: 'closed' })
  const shadowMountPoint = shadowRoot.appendChild(document.createElement('div'))
  const styleLink = shadowRoot.appendChild(document.createElement('link'))
  shadowMountPoint.id = 'redpill-react-root'
  styleLink.rel = 'stylesheet'
  styleLink.type = 'text/css'
  styleLink.href = chrome.extension.getURL('contentScript.css')
  const jss = create({ ...jssPreset(), insertionPoint: shadowMountPoint })
  // const frame = React.createElement(Frame, { key: 'frame' }, null)
  const styles = React.createElement(StylesProvider, { jss, key: 'styles' }, children)
  ReactDOM.render(styles, shadowMountPoint)
  return true
}
