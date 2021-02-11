<template>
  <div>
    <app-system-bar></app-system-bar>
    <app-bar></app-bar>
    <app-drawer></app-drawer>
    <keep-alive>
      <transition
          name="fade"
          mode="out-in"
          appear
      >
        <RouterView class="mt-3" />
      </transition>
    </keep-alive>
    <network-error></network-error>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AppBar from './components/AppBar.vue'
import AppDrawer from './components/AppDrawer.vue'
import AppSystemBar from './components/AppSystemBar.vue'
import NetworkError from '@/views/error/NetworkError.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'appLayout',
  props: {},
  mixins: [],
  components: {
    'app-bar': AppBar,
    'app-system-bar': AppSystemBar,
    'app-drawer': AppDrawer,
    'network-error': NetworkError
  },
  async created () {
    if (this.$storeModules.auth.getUserIsAuthorized) {
      this.$websocket.connect()
    }
  },
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
