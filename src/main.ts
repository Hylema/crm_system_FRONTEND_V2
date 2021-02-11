import { Container } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'
import WebSocket from '@/ws/WebSocket'
import createApp from '@/app'
import tokens from '@/tokens'

const store: StoreModules = Container.get(tokens.STORE) as StoreModules
const websocket: WebSocket = Container.get(tokens.WEBSOCKET) as WebSocket

store.theme.setDarkTheme(store.theme.getThemeIsDark)
store.auth.setHttpAccessToken()

if (!store.auth.tokensUpdatedLongTime()) {
  store.auth.setAuthorizationUser(true)
}

createApp()

// eslint --fix --ext .js, .ts, .vue src
// eslint --fix --ext .js,.vue,.ts src
