import { AxiosResponse } from 'axios'
import { Getter, Module, Mutation } from 'vuex-simple'
import { Injectable } from 'vue-typedi'
import { Message } from '@stomp/stompjs'
import ApiException from '@/errors/ApiException'
import ApiLogModule from '@/store/modules/logger/ApiLogModule'
import Exception from '@/errors/Exception'
import StoreModules from '@/store/CreateStoreModules'
import UnknownExceptionLogModule from '@/store/modules/logger/UnknownExceptionLogModule'
import WebSocketLogModule from '@/store/modules/logger/WebSocketLogModule'

/**
 * Module for LoggerModule
 */
@Injectable()
export default class LoggerModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @Module()
  public apiLogModule = new ApiLogModule(this.rootStore)

  @Module()
  public webSocketLogModule = new WebSocketLogModule(this.rootStore)

  @Module()
  public unknownException = new UnknownExceptionLogModule(this.rootStore)

  @Mutation()
  public setNewError (error: ApiException | Exception): void {
    if (error instanceof ApiException) this.apiLogModule.setNewApiException(error)
    else if (error instanceof Exception) this.unknownException.setNewUnknownException(error)
  }

  /** For Api */
  @Mutation()
  public setNewSuccessResponse (response: AxiosResponse): void {
    this.apiLogModule.setNewSuccessResponse(response)
  }

  /** For WebSocket */
  @Mutation()
  public setNewWSMessage (response: Message): void {
    this.webSocketLogModule.setNewWebSocketMessage(response)
  }

  @Getter()
  public get getAllNotificationsLength (): number {
    return this.apiLogModule.getApiResponsesLength + this.apiLogModule.getApiExceptionsLength +
      this.webSocketLogModule.getWebSocketMessageLength + this.unknownException.getUnknownExceptionLength
  }
}
