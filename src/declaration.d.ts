import { AxiosInstance } from 'axios'
import StoreModules from '@/store/CreateStoreModules'
import WebSocket from '@/ws/WebSocket'

declare module '*.scss'
declare module '*.sass'
declare module '*.css'
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $storeModules: StoreModules;
    $websocket: WebSocket;
    $style: any;
  }
}
