import { Getter, Mutation, State } from 'vuex-simple'
import { Message } from '@stomp/stompjs'
import StoreModules from '@/store/CreateStoreModules'

export default class WebSocketLogModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  /** Subscribe */
  @State()
  private _webSocketMessage: Message[] = []

  @Mutation()
  public setNewWebSocketMessage (response: Message) {
    if (response !== null && response !== undefined) {
      this._webSocketMessage.push(response)
    }
  }

  @Mutation()
  public removeWebSocketMessageByIndex (index: number) {
    if (index !== null && index !== undefined) {
      this._webSocketMessage.removeByIndex(index)
    }
  }

  @Getter()
  public get getWebSocketMessages (): Message[] {
    return this._webSocketMessage
  }

  @Getter()
  public get getWebSocketMessageLength (): number {
    return this._webSocketMessage.length
  }
}
