import { Getter, Mutation, State } from 'vuex-simple'
import { Injectable } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'

/**
 * Module for LoggerModule
 */
@Injectable()
export default class BackendErrosModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @State()
  private _webSocketIsConnect = true

  @Mutation()
  public setWebSocketIsConnect (newValue: boolean): void {
    this._webSocketIsConnect = newValue
  }

  @Getter()
  public get getWebSocketIsConnect (): boolean {
    return this._webSocketIsConnect
  }

  @State()
  private _networkError = false

  @Mutation()
  public setNetworkError (newValue: boolean): void {
    this._networkError = newValue
  }

  @Getter()
  public get getNetworkError (): boolean {
    return this._networkError
  }
}
