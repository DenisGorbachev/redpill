import { useState } from 'react'
import useInterval from '@use-it/interval'

export function preventDefault(handler) {
  return function () {
    arguments[0].preventDefault()
    return handler.apply(this, arguments)
  }
}

export function useIntervalForRender(delay = 1000) {
  const [now, set_now] = useState(new Date())
  useInterval(() => set_now(new Date()), delay)
  return now
}

export function querySelectorContains(selector, text, parent) {
  const els = parent.querySelectorAll(selector)
  for (const el of els) {
    if (~el.innerText.indexOf(text)) {
      return el
    }
  }
}
