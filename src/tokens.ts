import { Token } from 'vue-typedi'

/**
 * Here we generate some unique keys to bind our values to.
 *
 * This tokens are unique representation of your dependencies inside the app.
 *
 * @see https://github.com/sascha245/vue-typedi
 * @see https://github.com/typestack/typedi
 */
export default {
  // Comments service:
  AUTH_SERVICE: new Token('auth-service'),
  USERS_SERVICE: new Token('users-service'),

  // Axios instance:
  AXIOS: new Token('axios'),

  // Vuex instance:
  STORE: new Token('store'),

  // Websocket instance:
  WEBSOCKET: new Token('websocket'),

  // Vuetify instance:
  VUETIFY: new Token('vuetify'),

  // Router instance:
  ROUTER: new Token('router')
}
