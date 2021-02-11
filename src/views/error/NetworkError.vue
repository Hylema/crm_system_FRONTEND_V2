<template>
  <v-snackbar
      v-model="snackBar"
      :multi-line="true"
      color="background"
      outlined
      timeout="10000"
  >
    <span class="action--text">Произошла ошибка в сети. Она возникает когда сервер недоступен, или не разрешен указанный запрос</span>

    <template v-slot:action="{ attrs }">
      <v-btn
          color="action"
          text
          v-bind="attrs"
          @click="snackBar = false"
      >
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'NetworkError',
  props: {},
  mixins: [],
  components: {},
  data () {
    return {} as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    snackBar: {
      get (): boolean {
        return this.$storeModules.exception.getNetworkError
      },
      set (value: boolean): void {
        this.$storeModules.exception.setNetworkError(value)
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
