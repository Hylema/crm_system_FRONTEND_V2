import { Container } from 'vue-typedi'
import Vue from 'vue'
import WebSocket from '@/ws/WebSocket'
import tokens from '@/tokens'

function install (): WebSocket {
  const websocket: WebSocket = new WebSocket()

  Vue.prototype.$websocket = websocket

  Container.set(tokens.WEBSOCKET, websocket)

  return websocket
}

const websocket: WebSocket = install()

export default websocket
