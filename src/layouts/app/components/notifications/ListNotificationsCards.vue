<template>
  <v-container>
    <transition-group name="list" mode="in-out" v-if="notificationProp === notifications.apiSuccessResponse && apiSuccessResponses.length > 0">
      <notification-card
          v-for="(response, index) in apiSuccessResponses"
          :key="response"
          :title="`${response.status}`"
          :body="getApiBody(response)"
          :index="index"
          :color="'success'"
          :json="response"
          :remove="removeApiSuccessResponse"
      ></notification-card>
    </transition-group>
    <transition-group name="list" mode="in-out" v-if="notificationProp === notifications.apiException && apiExceptions.length > 0">
      <notification-card
          v-for="(exception, index) in apiExceptions"
          :key="exception"
          :title="`${exception.statusCode}`"
          :body="getApiBody(exception.response)"
          :index="index"
          :color="'error'"
          :json="exception"
          :remove="removeApiExceptions"
      ></notification-card>
    </transition-group>
    <transition-group name="list" mode="in-out" v-if="notificationProp === notifications.webSocketMessage && WSMessages.length > 0">
      <notification-card
          v-for="(message, index) in WSMessages"
          :key="message"
          :title="'WebSocket'"
          :body="getWsBody(message)"
          :index="index"
          :color="'success'"
          :json="message"
          :remove="removeWsMessage"
      ></notification-card>
    </transition-group>
    <transition-group name="list" mode="in-out" v-if="notificationProp === notifications.runTimeException && runTimeExceptions.length > 0">
      <notification-card
          v-for="(exception, index) in runTimeExceptions"
          :key="exception"
          :title="'Exception'"
          :index="index"
          :color="'error'"
          :json="exception"
          :remove="removeRunTimeExceptions"
      ></notification-card>
    </transition-group>
  </v-container>
</template>

<script lang="ts">
import { Api } from '@/constants'
import { AxiosResponse } from 'axios'
import { Message } from '@stomp/stompjs'
import { Notifications } from '@/enums'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ApiException from '@/errors/ApiException'
import ApiHelper from '@/helpers/ApiHelper'
import Exception from '@/errors/Exception'
import NotificationCard from '@/layouts/app/components/notifications/NotificationCard.vue'
import Vue from 'vue'
import WebSocketHelper from '@/helpers/WebSocketHelper'

interface Data {
  // enum for possible states of logger lists
  notifications: unknown;
}

export default Vue.extend({
  name: 'ListNotificationsCards',
  props: {
    notificationProp: {
      required: true
    }
  },
  mixins: [],
  components: {
    'notification-card': NotificationCard
  },
  data () {
    return {
      notifications: Notifications
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    apiSuccessResponses (): AxiosResponse[] {
      return this.$storeModules.logger.apiLogModule.getApiResponses
    },
    apiExceptions (): ApiException[] {
      return this.$storeModules.logger.apiLogModule.getApiExceptions
    },
    WSMessages (): Message[] {
      return this.$storeModules.logger.webSocketLogModule.getWebSocketMessages
    },
    runTimeExceptions (): Exception[] {
      return this.$storeModules.logger.unknownException.getUnknownException
    }
  },
  methods: {
    ...mapActions({}),
    removeApiSuccessResponse (index: number): void {
      this.$storeModules.logger.apiLogModule.removeResponseLogByIndex(index)
    },
    removeApiExceptions (index: number): void {
      this.$storeModules.logger.apiLogModule.removeErrorLogByIndex(index)
    },
    removeWsMessage (index: number): void {
      this.$storeModules.logger.webSocketLogModule.removeWebSocketMessageByIndex(index)
    },
    removeRunTimeExceptions (index: number): void {
      this.$storeModules.logger.unknownException.removeLogByIndex(index)
    },
    getApiBody (response: AxiosResponse): string {
      return ApiHelper.getApiOperationsName(response)
    },
    getWsBody (message: Message): string {
      return WebSocketHelper.getWsOperationsName(message)
    },
    generateRandomKey (unknown: unknown): string {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < characters.length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }

      return result
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">
.list-enter-active
  transition: all 0.2s ease

.list-enter, .list-leave-to
  opacity: 0
  transform: translateX(70px)
</style>
