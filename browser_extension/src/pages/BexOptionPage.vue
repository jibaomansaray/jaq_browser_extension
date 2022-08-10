<template>
  <q-page class="row items-center justify-evenly">
    <div class="row">
      <div class="col-12">
        <q-input :label="'Find: '+ subject" v-model="subject" />
      </div>
      <div class="col-12">
        <q-input :label="'Replace: jaqexplorer://' + replace" v-model="replace" />
      </div>
      <div class="col-12">
        <q-input type="textarea" label="Domain" placeholder="example.com,example2.com" v-model="domain" />
      </div>
      <div class="col-12 q-mt-md">
        <q-btn @click="doSave" color="primary">Save</q-btn>
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
    const replace = ref('')
    const domain = ref('')
    const q = useQuasar()
    const storageName = 'settings'

    q.bex.send('storage.get', { key: storageName }).then((settings) => {
      if (settings.data) {
        subject.value = settings.data.jaq_find
        replace.value = settings.data.jaq_replace
        domain.value = settings.data.jaq_domain || ''
      }
    }).catch(() => {
      // ignore
    })

    const doSave = () => {
      q.bex.send('storage.set', {
        key: storageName,
        data: {
          jaq_find: subject.value,
          jaq_replace: `jaqexplorer://${replace.value}`,
          jaq_domain: domain.value
        }
      })
    }

    return {
      subject,
      replace,
      domain,
      doSave
    }
  }
})
</script>
