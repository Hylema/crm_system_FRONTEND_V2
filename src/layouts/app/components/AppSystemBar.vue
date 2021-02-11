<template>
  <transition
      name="fade"
      mode="out-in"
      appear
  >
    <v-system-bar
        v-if="!webSocketIsConnect"
        class="pa-0"
        app
        :height="height"
    >
      <v-alert
          :height="height"
          color="background"
          dense
          dark
          width="100%"
          style="border-radius: 0px"
          class="ma-0"
      >
        <v-progress-circular
            indeterminate
            color="action"
            class="mr-5"
        ></v-progress-circular>
        <strong class="action--text">Потеряно соединение с сервером, попытка переподключиться...</strong>
      </v-alert>
    </v-system-bar>
  </transition>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'AppSystemBar',
  props: {},
  mixins: [],
  components: {},
  data () {
    return {
      height: '50px'
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    webSocketIsConnect (): boolean {
      return this.$storeModules.exception.getWebSocketIsConnect
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
