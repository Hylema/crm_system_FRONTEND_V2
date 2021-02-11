<template>
  <v-text-field
      v-bind="vTextFieldEmail"
      v-model="email"
  ></v-text-field>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'TextFieldEmailComponent',
  props: {
    value: String,
    emailRules: Array
  },
  data () {
    return {} as Data
  },
  computed: {
    ...mapGetters({}),
    email: {
      get (): string {
        return this.value
      },
      set (value: string): void {
        if (value === null) value = ''

        this.$emit('input', value)
      }
    },
    vTextFieldEmail (): object {
      return {
        color: 'action',
        label: 'E-mail',
        clearable: true,
        outlined: true,
        autofocus: true,
        rules: this.emailRules
      }
    }
  },
  methods: {},
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
