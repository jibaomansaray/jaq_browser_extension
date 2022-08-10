// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'

export default bexContent((bridge) => {
  const storageName = 'settings'
  bridge.send('storage.get', { key: storageName })
    .then((settings) => {
      if (settings.data) {
        const subject = settings.data.jaq_find
        const replace = settings.data.jaq_replace
        const list = document.querySelectorAll(`a[href^='${subject}']`)
        list.forEach((a) => {
          a.href = a.getAttribute('href').replace(subject, replace)
        })
      }
    }).catch((error) => {
      console.log('could not fetch settings', error)
    })
})
