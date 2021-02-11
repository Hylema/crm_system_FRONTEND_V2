<template>
  <div style="height: 2000px"></div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'mainView',
  props: {},
  mixins: [],
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({})
  },
  methods: {
    ...mapActions({})
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
