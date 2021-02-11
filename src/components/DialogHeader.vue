<template>
  <div>
    <progress-liner :loading="loading"></progress-liner>
    <v-layout justify-space-between>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-btn icon dark color="action" @click="dialog = false"><v-icon>close</v-icon></v-btn>
    </v-layout>

    <v-divider style="margin: 0px"></v-divider>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ProgressLinear from '@/components/ProgressLinear.vue'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'DialogHeader',
  props: {
    loading: Boolean,
    value: Boolean,
    title: String
  },
  mixins: [],
  components: {
    'progress-liner': ProgressLinear
  },
  data () {
    return {} as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    dialog: {
      get (): boolean {
        return this.value
      },
      set (value: boolean): void {
        if (value === null) {
          value = false
        }
        this.$emit('input', value)
      }
    }
  },
  methods: {
    ...mapActions({})
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
