import { BackendUrl, WebSockets } from '@/constants'
import { CompatClient, FrameImpl, IFrame, Message, Stomp } from '@stomp/stompjs'
import { Container } from 'vue-typedi'
import SockJS from 'sockjs-client'
import StoreModules from '@/store/CreateStoreModules'
import User from '@/models/users/User'
import WebSocketErrorMessageModel from '@/ws/WebSocketErrorMessageModel'
import WebSocketHelper from '@/helpers/WebSocketHelper'
import tokens from '@/tokens'

export default class WebSocket {
  get isConnect (): boolean {
    return this.$store.exception.getWebSocketIsConnect
  }

  set isConnect (value: boolean) {
    this.$store.exception.setWebSocketIsConnect(value)
  }

  private sockJs = new SockJS(`${BackendUrl}/websocket`)
  private stomp: CompatClient = Stomp.over(() => this.sockJs)

  private get $store (): StoreModules {
    return Container.get(tokens.STORE) as StoreModules
  }

  public connect (): void {
    this.stomp = Stomp.over(() => new SockJS(`${BackendUrl}/websocket`))
    this.stomp.connect({ Authorization: this.$store.auth.getAccessToken },
      (frame: FrameImpl) => {
        this.isConnect = true
        this.usersSubscribers()
      },
      // eslint-disable-next-line handle-callback-err
      (error) => {
        console.log('stomp errrrrrrrrrrrrr', error)
      },
      () => {
        console.log('web socket disconnect')
        this.stomp.disconnect()
        this.sockJs.close()
        this.isConnect = false
        setTimeout(() => {
          this.connect()
        }, 5000)
      })
  }

  public disconnect (): void {
    this.stomp.disconnect()
  }

  public usersSubscribers (): void {
    if (this.isConnect) {
      this.$store.loading.users.setLoadingUsers(true)

      this.$store.users.actionGetAllUsers().then(() => {
        this.stomp.subscribe(WebSockets.USERS.CREATED.ROUTE, (message: Message) =>
          this.$store.users.setCreatedUser(WebSocketHelper.createWSModel<User>(message, User.fromJson)))

        this.stomp.subscribe(WebSockets.USERS.UPDATED.ROUTE, (message: Message) =>
          this.$store.users.setUpdatedUser(WebSocketHelper.createWSModel<User>(message, User.fromJson)))

        this.stomp.subscribe(WebSockets.USERS.DELETED.ROUTE, (message: Message) =>
          this.$store.users.setDeletedUser(WebSocketHelper.createWSModel<User>(message, User.fromJson)))
      })
    } else console.error('cannot subscribe')

    this.$store.loading.users.setLoadingUsers(false)

    // eslint-disable-next-line handle-callback-err
  }

  public usersUnSubscribers (): void {
    if (this.isConnect) {
      this.stomp.unsubscribe(WebSockets.USERS.UPDATED.ROUTE)

      this.stomp.unsubscribe(WebSockets.USERS.CREATED.ROUTE)

      this.stomp.unsubscribe(WebSockets.USERS.DELETED.ROUTE)
    } else throw new Error('cannot unSubscribe')
  }

  // public createUser (user: User, success: Function, error: Function): void {
  //   this.$store.loading.users.setLoadingCRUDUsers(true)
  //
  //   this.successCreateUser = success
  //   this.errorCreateUser = error
  //
  //   console.log(user, 'user')
  //
  //   this.stomp.send(WebSockets.USERS.SEND.CREATE, {}, JSON.stringify({
  //     roleIds: [2],
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email
  //   }))
  // }
  //
  // public patchUser (user: object): void {
  //   this.$store.loading.users.setLoadingCRUDUsers(true)
  //
  //   this.stomp.send(WebSockets.USERS.SEND.PATCH, {}, JSON.stringify(user))
  // }
  //
  // public putUser (user: User): void {
  //   this.$store.loading.users.setLoadingCRUDUsers(true)
  //
  //   this.stomp.send(WebSockets.USERS.SEND.PUT, {}, JSON.stringify(user))
  // }
  //
  // public deleteUser (user: User): void {
  //   this.$store.loading.users.setLoadingCRUDUsers(true)
  //
  //   this.stomp.send(WebSockets.USERS.SEND.DELETE, {}, JSON.stringify({
  //     id: user.id
  //   }))
  // }
}

// export default async function stompConnect () {
//   const stomp = Stomp.over(() => new SockJS(`${BackendUrl}/aegis_crm_system`))
//   const currentUser = await store.dispatch('auth/getCurrentAuthUser')
//   Vue.prototype.$stomp = stomp
//
//   if (currentUser !== null) {
//     const currentUserIndent = `/user/${store.getters['user/currentUser'].email}`
//
//     stomp.connect({ Authorization: store.getters['auth/token'] }, frame => {
//       store.commit('tasks/loadingTasks', true)
//       store.commit('ws/WSConnect', true)
//
//       console.log('connected success')
//
//       stomp.subscribe(`${currentUserIndent}/usr/getAll`, response => {
//         console.log(JSON.parse(response.body), 12)
//         store.commit('users/setUsers', JSON.parse(response.body))
//       })
//       stomp.subscribe('/usr/update', response => {
//         store.commit('users/updateUser', JSON.parse(response.body))
//       })
//       stomp.subscribe('/usr/create', response => {
//         store.commit('users/createUser', JSON.parse(response.body))
//       })
//       stomp.subscribe('/usr/delete', response => {
//         store.commit('users/deleteUser', JSON.parse(response.body))
//       })
//       stomp.subscribe(`${currentUserIndent}/status/getAll`, response => {
//         store.commit('tasks/setStatus', JSON.parse(response.body))
//       })
//
//       stomp.subscribe(`${currentUserIndent}/task/getAll`, response => {
//         store.commit('tasks/loadingTasks', false)
//         store.commit('tasks/setTasks', JSON.parse(response.body))
//       })
//       stomp.subscribe(`${currentUserIndent}/task/create`, response => {
//         store.dispatch('tasks/createdTaskFromWS', JSON.parse(response.body))
//       })
//       stomp.subscribe(`${currentUserIndent}/task/update`, response => {
//         store.dispatch('tasks/updatedTaskFromWS', JSON.parse(response.body))
//       })
//       stomp.subscribe(`${currentUserIndent}/task/patch`, response => {
//         store.dispatch('tasks/updatedTaskFromWS', JSON.parse(response.body))
//       })
//       stomp.subscribe(`${currentUserIndent}/task/delete`, response => {
//         store.dispatch('tasks/deletedTaskFromWS', JSON.parse(response.body))
//       })
//
//       stomp.subscribe(`${currentUserIndent}/response/task/create/success`, response => {
//         store.commit('tasks/loadingActionTask', false)
//         store.commit('tasks/dialogCreateUpdateTask', false)
//       })
//       stomp.subscribe(`${currentUserIndent}/response/task/update/success`, response => {
//         store.commit('tasks/loadingActionTask', false)
//         store.commit('tasks/dialogCreateUpdateTask', false)
//       })
//       stomp.subscribe(`${currentUserIndent}/response/task/patch/success`, response => {
//         store.commit('tasks/loadingActionTask', false)
//         store.commit('tasks/dialogCreateUpdateTask', false)
//       })
//       stomp.subscribe(`${currentUserIndent}/response/task/delete/success`, response => {
//
//       })
//       stomp.subscribe(`${currentUserIndent}/response/task/comment/success`, response => {
//         store.dispatch('tasks/createdCommentSuccessFromWS', JSON.parse(response.body))
//       })
//
//       stomp.subscribe(`${currentUserIndent}/task/error`, response => {
//         console.log(response, 'response')
//       })
//
//       stomp.send('/app/getAllUser')
//       stomp.send('/app/getAllTask', {}, JSON.stringify(store.getters['tasks/filters']))
//       stomp.send('/app/getAllStatus')
//     }, async error => {
//       if (error.headers.message === '401') {
//         store.commit('tasks/loadingTasks', true)
//
//         await store.dispatch('auth/tokenVerify').then(async tokenVerifyIsValid => {
//           if (!tokenVerifyIsValid) {
//             return await store.dispatch('auth/getTokenByRefresh').then(async refreshTokenSuccess => {
//               if (refreshTokenSuccess) {
//                 stompConnect()
//               } else {
//                 store.commit('auth/logout')
//
//                 stomp.disconnect()
//               }
//             })
//           }
//         })
//
//         Vue.notify({
//           group: 'Api',
//           title: `${error.headers.message}`,
//           data: {},
//           text: 'WebSocket, токен устарел',
//           type: 'error',
//           duration: 1000000
//         })
//
//         // setTimeout(stompConnect, 5000);
//       }
//     })
//   }
// }
