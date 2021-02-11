<template>
  <v-btn
      @click="$emit('click')"
      class="mr-4 action"
      v-bind="vBtnLoginIn"
      :disabled="!propIsValid"
      :loading="isLoading"
  >
    <div style="color: white">Вход</div>
  </v-btn>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'BtnLoginInComponent',
  props: {
    propIsValid: {
      type: Boolean,
      required: true
    }
  },
  mixins: [],
  components: {},
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    isLoading (): boolean {
      return this.$storeModules.loading.auth.getLoadingWhenUserLoginIn
    },
    // isLoading: (vm: object) => vm.$storeModules.loading.auth.getLoadingWhenUserLoginIn,
    vBtnLoginIn (): object {
      return {
        block: true,
        height: 60
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
