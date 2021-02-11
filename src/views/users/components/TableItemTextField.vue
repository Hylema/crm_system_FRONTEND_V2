<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
        v-bind="vTextField"
        @keydown.enter="patch()"
        v-model="model"
        style="min-width: 400px"
    >
      <template v-slot:append-outer>
        <v-btn
            @click="patch()"
            v-bind="vBtn"
        ><v-icon dark>check</v-icon></v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script lang="ts">
import 'either-ts'
import { VForm } from '@/mixins/default/types'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
  // Проверка на правильность введенного E-mail
  valid: boolean;
}

export default Vue.extend({
  name: 'TableItemTextField',
  props: {
    close: Function,
    rules: Array,
    value: String
  },
  mixins: [],
  components: {},
  data () {
    return {
      valid: true
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    form (): VForm {
      return this.$refs.form as VForm
    },
    vTextField (): object {
      return {
        rules: this.rules,
        label: 'E-mail',
        counter: true,
        autofocus: true,
        maxlength: 40,
        loading: this.loading
      }
    },
    vBtn (): object {
      return {
        disabled: !this.valid,
        class: 'action',
        icon: true,
        dark: true,
        loading: this.loading
      }
    },
    loading (): boolean {
      return this.$storeModules.loading.users.getLoadingPatchUsers
    },
    model: {
      get (): string {
        return this.value
      },
      set (value: string): void {
        if (value === null) value = ''

        this.$emit('input', value)
      }
    }
  },
  methods: {
    ...mapActions({}),
    patch (): void {
      this.$emit('patch')
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
