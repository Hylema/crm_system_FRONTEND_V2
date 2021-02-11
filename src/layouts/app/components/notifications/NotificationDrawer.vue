<template>
  <v-navigation-drawer
      v-bind="vNotificationDrawer"
      class="background-darker"
      v-model="drawer"
  >
    <div class="mr-5 mt-3">
      <v-badge
          overlap
          color="error"
          :content="runTimeExceptionsLength"
          :value="runTimeExceptionsLength > 0"
          class="btn-indents"
      >
        <v-btn
            :color="activeButton === notifications.runTimeException ? 'activeAction' : 'action'"
            block
            dark
            @click.stop="showNotifications(notifications.runTimeException)"
        >RunTimeException</v-btn>
      </v-badge>
      <v-layout>
        <v-flex md6 class="mr-2">
          <v-badge
              overlap
              color="success"
              :content="apiSuccessResponsesLength"
              :value="apiSuccessResponsesLength > 0"
              class="btn-indents"
          >
            <v-btn
                :color="activeButton === notifications.apiSuccessResponse ? 'activeAction' : 'action'"
                block
                dark
                @click.stop="showNotifications(notifications.apiSuccessResponse)"
            >Api Response</v-btn>
          </v-badge>
        </v-flex>
        <v-flex md6>
          <v-badge
              overlap
              color="error"
              :content="apiExceptionsLength"
              :value="apiExceptionsLength > 0"
              class="btn-indents"
          >
            <v-btn
                :color="activeButton === notifications.apiException ? 'activeAction' : 'action'"
                block
                dark
                @click.stop="showNotifications(notifications.apiException)"
            >Api Error</v-btn>
          </v-badge>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex md6 class="mr-2">
          <v-badge
              overlap
              color="success"
              :content="wsMessageLength"
              :value="wsMessageLength > 0"
              class="btn-indents"
          >
            <v-btn
                :color="activeButton === notifications.webSocketMessage ? 'activeAction' : 'action'"
                block
                dark
                @click.stop="showNotifications(notifications.webSocketMessage)"
            >WS Message</v-btn>
          </v-badge>
        </v-flex>
      </v-layout>
    </div>
    <list-notifications-cards :notification-prop="activeButton"></list-notifications-cards>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Notifications } from '@/enums'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ListNotificationsCards from '@/layouts/app/components/notifications/ListNotificationsCards.vue'
import Vue from 'vue'

interface Data {
  // enum for possible states of logger lists
  notifications: unknown;

  // current active logger list
  activeButton: number;
}

export default Vue.extend({
  name: 'AppNotificationDrawer',
  props: {
    value: Boolean
  },
  mixins: [],
  components: {
    'list-notifications-cards': ListNotificationsCards
  },
  data () {
    return {
      notifications: Notifications,
      activeButton: null
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    drawer: {
      get (): boolean {
        return this.value
      },
      set (value: boolean): void {
        if (value === null) value = false

        this.$emit('input', value)
      }
    },
    apiSuccessResponsesLength (): number {
      return this.$storeModules.logger.apiLogModule.getApiResponsesLength
    },
    apiExceptionsLength (): number {
      return this.$storeModules.logger.apiLogModule.getApiExceptionsLength
    },
    wsMessageLength (): number {
      return this.$storeModules.logger.webSocketLogModule.getWebSocketMessageLength
    },
    runTimeExceptionsLength (): number {
      return this.$storeModules.logger.unknownException.getUnknownExceptionLength
    },
    vNotificationDrawer (): object {
      return {
        temporary: true,
        right: true,
        fixed: true,
        'hide-overlay': true,
        width: 300
      }
    }
  },
  methods: {
    ...mapActions({}),
    showNotifications (notification: Notifications): void {
      if (this.activeButton !== notification) this.activeButton = notification
      else this.activeButton = null
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">
.btn-indents
  margin: 5px 10px
  width: 100%
</style>
