import { Observable } from 'rxjs'
import { create } from 'rxjs-spy'
import { tag as tag_original } from 'rxjs-spy/operators'

export const spy = create()
export const tag = tag_original

export const fromMutationObserver = (target, config) => {
  return new Observable((observer) => {
    const mutation = new MutationObserver((mutations, instance) => {
      for (const mutation of mutations) {
        observer.next(mutation)
      }
    })
    mutation.observe(target, config)
    return () => {
      console.error('"disconnecting"', 'disconnecting')
      return mutation.disconnect()
    }
  })
}
