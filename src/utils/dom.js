export function isButton(node) {
  return node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'button'
}

export function removeChildren(parent) {
  while (parent.firstChild) parent.firstChild.remove()
  return parent
}
