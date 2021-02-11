<template>
  <div>
    <v-app-bar
        v-bind="vAppBarDesktop"
        style="border-radius: 0px !important;"
    >
      <img
          :height="$vuetify.breakpoint.smAndDown ? 32 : 40"
          class="ml-2 clickable"
          src="@/assets/logo.svg"
      />
      <v-toolbar-title style="margin-right: 10px;">ue.js 2.0</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="drawer = true">
        <v-badge
            style="margin-right: 10px"
            overlap
            color="action"
            :content="allNotificationsLength"
            :value="allNotificationsLength > 0"
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <template v-slot:extension>
        <progress-liner :loading="loading" :height="3"></progress-liner>
        <v-divider class="mx-4 action"></v-divider>
        <div><h2 class="action--text">{{ getCurrentRouteName }}</h2></div>
        <v-divider class="mx-4 action"></v-divider>
      </template>
    </v-app-bar>
    <notification-drawer
        v-model="drawer"
    ></notification-drawer>
  </div>
</template>

<script lang="ts">
import { Routers } from '@/constants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NotificationDrawer from '@/layouts/app/components/notifications/NotificationDrawer.vue'
import ProgressLinear from '@/components/ProgressLinear.vue'
import Vue from 'vue'

interface Data {
  // current state notification drawer
  drawer: boolean;
}

export default Vue.extend({
  name: 'AppBar',
  props: {},
  mixins: [],
  components: {
    'notification-drawer': NotificationDrawer,
    'progress-liner': ProgressLinear
  },
  data () {
    return {
      drawer: false
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    vAppBarDesktop (): object {
      return {
        color: 'background',
        app: true,
        fixed: false,
        border: 0,
        outlined: true,
        flat: true,
        height: 49,
        dense: true
      }
    },
    allNotificationsLength (): number {
      return this.$storeModules.logger.getAllNotificationsLength
    },
    loading (): boolean {
      return this.$storeModules.loading.page.getPageLoading
    },
    getCurrentRouteName (): string {
      switch (this.$route.name) {
        case Routers.USERS.NAME: return 'Администрирование пользователей'
        case Routers.MAIN.NAME: return 'Главная'
        case Routers.PROFILE.NAME: return 'Профиль пользователя'
        default: return this.$route.name
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
.theme--light.v-sheet--outlined, .theme--dark.v-sheet--outlined
  border: none
</style>
