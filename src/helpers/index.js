export const copyToClipboard = (text, callback = null) => {
  function selectElementText(element) {
    if (document.selection) {
      let range = document.body.createTextRange()
      range.moveToElementText(element)
      range.select()
    } else if (window.getSelection) {
      let range = document.createRange()
      range.selectNode(element)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    }
  }
  let element = document.createElement("div")
  element.textContent = text
  document.body.appendChild(element)
  selectElementText(element)
  document.execCommand("copy")
  element.remove()
  if (callback !== null) callback()
}
