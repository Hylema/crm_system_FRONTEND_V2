<template>
  <v-navigation-drawer
      v-model="drawer"
      class="background"
      app
      :mini-variant="drawerIsMini"
      :src="themeIsDark ? require('@/assets/images/darkBackgroundImage.jpg') : require('@/assets/images/lightBackgroundImage.jpg')"
      permanent
      overlay-color="red"
  >
    <template v-slot:img="{ height, src }">
      <v-img
          :src="src"
          :height="height"
          gradient="to top right, rgba(100,115,201,.13), rgba(25,32,72,.8)"
      ></v-img>
    </template>
    <switch-day-and-night
        @click.stop="themeIsDark = !themeIsDark"
        v-model="themeIsDark"
        :drawer-is-mini="drawerIsMini"
    ></switch-day-and-night>

    <v-tabs class="pa-0" vertical dark background-color="transparent" slider-color="white" slider-size="4" active-class="actionColor">
      <v-tab link :to="`/profile/${user.id}`" class="pl-2">
        <v-list-item dark class="pa-0 px-0">
          <v-list-item-action class="mr-0">
            <user-avatar :user-prop="user"></user-avatar>
          </v-list-item-action>
          <v-list-item-content> {{`${user.firstName} ${user.lastName}`}}</v-list-item-content>
        </v-list-item>
      </v-tab>
      <v-tab link :to="tab.route" v-for="tab in tabs" :key="tab.name">
        <v-list-item class="pa-0" v-if="tab.name !== 'Admin' || userIsAdmin">
          <v-list-item-action class="mr-4">
            <v-icon>{{ tab.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ tab.title }}
          </v-list-item-content>
        </v-list-item>
      </v-tab>
    </v-tabs>

    <template v-slot:append>
      <v-list dark style="padding: 0">
        <v-list-item @click="drawerIsMini =! drawerIsMini">
          <v-list-item-action>
            <v-icon>{{ !drawerIsMini ? 'mdi-arrow-collapse-horizontal' : 'mdi-arrow-expand-horizontal' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Свернуть</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DayAndNight from '@/layouts/app/components/DayAndNight.vue'
import User from '@/models/users/User'
import Vue from 'vue'

interface Data {
  // drawer current state values
  drawer: boolean;

  // navigation tabs for drawer
  tabs: object;
}

export default Vue.extend({
  name: 'AppDrawer',
  props: {},
  mixins: [],
  components: {
    'switch-day-and-night': DayAndNight
  },
  data () {
    return {
      drawer: false,
      tabs: [
        {
          title: 'Главная',
          icon: 'home',
          route: '/'
        },
        {
          title: 'Документы',
          icon: 'mdi-file-document-outline',
          route: '/documents'
        },
        {
          title: 'Задачи',
          icon: 'mdi-clipboard-list-outline',
          route: '/tasks',
          name: 'Tasks',
          children: [
            {
              title: 'Канбан',
              path: 'canban',
              name: 'CanbanTask',
              icon: 'mdi-clipboard-list-outline',
              route: ''
            },
            {
              title: 'Таблица',
              path: 'table',
              name: 'TableTask',
              icon: 'mdi-clipboard-list-outline',
              route: 'instructed'
            }
          ]
        },
        {
          title: 'Администрирование',
          icon: 'mdi-monitor',
          route: '/admin',
          name: 'Admin',
          children: [
            {
              title: 'Пользователи',
              name: 'users',
              icon: 'mdi-account',
              route: ''
            }
          ]
        }
      ]
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    themeIsDark: {
      get (): boolean {
        return this.$storeModules.theme.getThemeIsDark
      },
      set (value: boolean): void {
        this.$storeModules.theme.setDarkTheme(value)
      }
    },
    drawerIsMini: {
      get (): boolean {
        return this.$storeModules.theme.getDrawerIsMini
      },
      set (value: boolean): void {
        console.log(value, 'setdrawerIsMini')
        this.$storeModules.theme.setDrawer(value)
      }
    },
    user (): User {
      return this.$storeModules.auth.getCurrentAuthUser
    },
    userIsAdmin (): boolean {
      return this.$storeModules.auth.getUserIsAdmin
    }
  },
  methods: {
    ...mapActions({})
  },
  watch: {}
})
</script>

<style lang="sass" scoped>
  $switch-width: 78px !default
  .actionColor
    background-color: rgba(251,252,254, 0.2)
</style>
