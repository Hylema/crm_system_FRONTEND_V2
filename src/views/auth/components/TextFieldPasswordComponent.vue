<template>
  <v-text-field
      @click:append="showPassword = !showPassword"
      v-bind="vTextFieldPassword"
      v-model="password"
  ></v-text-field>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Vue from 'vue'

interface Data {
  // If user want to see password
  showPassword: boolean;
}

export default Vue.extend({
  name: 'TextFieldPasswordComponent',
  props: {
    value: {
      type: String,
      required: true
    },
    passwordRules: Array
  },
  data () {
    return {
      showPassword: false
    } as Data
  },
  methods: {},
  computed: {
    ...mapGetters({}),
    password: {
      get (): string {
        return this.value
      },
      set (value: string): void {
        if (value === null) {
          value = ''
        }
        this.$emit('input', value)
      }
    },
    vTextFieldPassword (): object {
      return {
        outlined: true,
        autofocus: false,
        color: 'action',
        label: 'Password',
        clearable: true,
        rules: this.passwordRules,
        appendIcon: this.showPassword ? 'mdi-eye' : 'mdi-eye-off',
        type: this.showPassword ? 'text' : 'password'
      }
    }
  },
  watch: {}
})
</script>

<style scoped>

</style>
