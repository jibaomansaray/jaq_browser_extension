// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'

export default bexContent((/* bridge */) => {
  const subject = 'file://'
  const replace = 'unshift://'
  const list = document.querySelectorAll(`a[href^='${subject}']`)

  list.forEach((a) => {
    a.href = a.href.replace(subject, replace)
    console.log('link: ' + a.href)
  })

  // Hook into the bridge to listen for events sent from the client BEX.
  /*
  bridge.on('some.event', event => {
    if (event.data.yourProp) {
      // Access a DOM element from here.
      // Document in this instance is the underlying website the contentScript runs on
      const el = document.getElementById('some-id')
      if (el) {
        el.value = 'Quasar Rocks!'
      }
    }
  })
  */
})
