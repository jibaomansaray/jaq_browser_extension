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
    const subject = ref('')
    const replace = ref('')
    const q = useQuasar()

    const doSave = () => {
      console.log('sending settings')
      q.bex.send('save_settings', {
        jack_find: subject.value,
        jack_replace: replace.value
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
