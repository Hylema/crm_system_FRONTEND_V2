import { AxiosResponse } from 'axios'
import { Getter, Mutation, State } from 'vuex-simple'
import ApiException from '@/errors/ApiException'
import StoreModules from '@/store/CreateStoreModules'

export default class ApiLogModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @State()
  private _apiResponses: AxiosResponse[] = []

  @Mutation()
  public setNewSuccessResponse (response: AxiosResponse) {
    if (response !== null && response !== undefined) {
      this._apiResponses.push(response)
    }
  }

  @Mutation()
  public removeResponseLogByIndex (index: number) {
    if (index !== null && index !== undefined) {
      this._apiResponses.removeByIndex(index)
    }
  }

  @Getter()
  public get getApiResponses (): AxiosResponse[] {
    return this._apiResponses
  }

  @Getter()
  public get getApiResponsesLength (): number {
    return this._apiResponses.length
  }

  @State()
  private _apiErrors: ApiException[] = []

  @Mutation()
  public setNewApiException (error: ApiException): void {
    if (error !== null && error !== undefined) {
      this._apiErrors.push(error)
    }
  }

  @Mutation()
  public removeErrorLogByIndex (index: number) {
    if (index !== null && index !== undefined) {
      this._apiErrors.removeByIndex(index)
    }
  }

  @Getter()
  public get getApiExceptions (): ApiException[] {
    return this._apiErrors
  }

  @Getter()
  public get getApiExceptionsLength (): number {
    return this._apiErrors.length
  }
}
