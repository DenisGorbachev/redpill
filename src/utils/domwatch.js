/* global MutationObserver WebKitMutationObserver */

export const depart = (selector, rootNode, fallbackDelay) => new Promise((resolve, reject) => {
  try {
    const root = rootNode
      ? typeof rootNode === 'string' ? document.querySelector(rootNode) : rootNode
      : document
    const ObserverClass = MutationObserver || WebKitMutationObserver || null
    const mutationObserverSupported = typeof ObserverClass === 'function'

    let observer

    const stopWatching = () => {
      if (observer) {
        if (mutationObserverSupported) {
          observer.disconnect()
        } else {
          clearInterval(observer)
        }

        observer = null
      }
    }

    const findAndResolveElements = () => {
      const allElements = root.querySelectorAll(selector)

      if (allElements.length === 0) {
        stopWatching()
        resolve(true)
      }
    }

    if (mutationObserverSupported) {
      observer = new ObserverClass(mutationRecords => {
        const nodesWereRemoved = mutationRecords.reduce(
          (found, record) => found || (record.removedNodes && record.removedNodes.length > 0),
          false
        )

        // console.log('nodesWereRemoved', nodesWereRemoved);

        if (nodesWereRemoved) {
          findAndResolveElements()
        }
      })

      observer.observe(root, {
        childList: true,
        subtree: true,
      })
    } else {
      observer = setInterval(findAndResolveElements, fallbackDelay || 250)
    }

    findAndResolveElements()
  } catch (exception) {
    reject(exception)
  }
})

export const departWatch = (callback, selector, rootNode, fallbackDelay) => {
  (function awaiter(continueWatching = true) {
    if (continueWatching === false) return

    depart(selector, rootNode, fallbackDelay)
      .then(callback)
      .then(awaiter)
  }())
}

export const arrive = (selector, rootNode, fallbackDelay) => new Promise((resolve, reject) => {
  try {
    const root = rootNode
      ? typeof rootNode === 'string' ? document.querySelector(rootNode) : rootNode
      : document
    const ObserverClass = MutationObserver || WebKitMutationObserver || null
    const mutationObserverSupported = typeof ObserverClass === 'function'

    let observer

    const stopWatching = () => {
      if (observer) {
        if (mutationObserverSupported) {
          observer.disconnect()
        } else {
          clearInterval(observer)
        }

        observer = null
      }
    }

    const findAndResolveElements = () => {
      const allElements = root.querySelectorAll(selector)

      if (allElements.length === 0) return

      const newElements = []

      const attributeForBypassing = 'data-arrive-resolved'

      allElements.forEach((el, i) => {
        if (typeof el[attributeForBypassing] === 'undefined') {
          allElements[i][attributeForBypassing] = ''
          newElements.push(allElements[i])
        }
      })

      if (newElements.length > 0) {
        stopWatching()
        resolve(newElements)
      }
    }

    if (mutationObserverSupported) {
      observer = new ObserverClass(mutationRecords => {
        const nodesWereAdded = mutationRecords.reduce(
          (found, record) => found || (record.addedNodes && record.addedNodes.length > 0),
          false
        )

        if (nodesWereAdded) {
          findAndResolveElements()
        }
      })

      observer.observe(root, {
        childList: true,
        subtree: true,
      })
    } else {
      observer = setInterval(findAndResolveElements, fallbackDelay || 250)
    }

    findAndResolveElements()
  } catch (exception) {
    reject(exception)
  }
})

export const arriveWatch = (callback, selector, rootNode, fallbackDelay) => {
  (function awaiter(continueWatching = true) {
    if (continueWatching === false) return

    arrive(selector, rootNode, fallbackDelay)
      .then(callback)
      .then(awaiter)
  }())
}
