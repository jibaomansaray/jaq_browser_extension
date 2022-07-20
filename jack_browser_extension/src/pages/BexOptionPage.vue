<template>
  <q-page class="row items-center justify-evenly">
    <div class="row">
      <div class="col-12">
        <q-input label="Find" v-model="subject" />
      </div>
      <div class="col-12">
        <q-input label="Replace" v-model="replace" />
      </div>
      <div class="col-12">
        <q-btn @click="doSave">Save</q-btn>
      </div>
    </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const subject = ref('file://')
    const replace = ref('jackexplorer://')
    const q = useQuasar()
    const storageName = 'settings'

    q.bex.send('storage.get', { key: storageName }).then((settings) => {
      if (settings.data) {
        subject.value = settings.data.jack_find
        replace.value = settings.data.jack_replace
      }
    }).catch((e) => {
      console.log('error', e)
    })

    const doSave = () => {
      q.bex.send('storage.set', {
        key: storageName,
        data: {
          jack_find: subject.value,
          jack_replace: replace.value
        }
      })
    }

    return {
      subject,
      replace,
      doSave
    }
  }
})
</script>
