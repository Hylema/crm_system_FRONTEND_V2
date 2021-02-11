<template>
  <v-progress-linear
      v-bind="vProgressLinear"
      :active="loading"
      :indeterminate="loading"
  ></v-progress-linear>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'name',
  props: {
    loading: Boolean,
    height: Number
  },
  mixins: [],
  components: {},
  data () {
    return {} as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    vProgressLinear () {
      return {
        absolute: true,
        top: true,
        height: this.height ? this.height : 7,
        color: 'action'
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
