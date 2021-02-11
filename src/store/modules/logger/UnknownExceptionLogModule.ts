import { Getter, Mutation, State } from 'vuex-simple'
import Exception from '@/errors/Exception'
import StoreModules from '@/store/CreateStoreModules'

export default class UnknownExceptionLogModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @State()
  private _runTimeExceptions: Exception[] = []

  @Mutation()
  public setNewUnknownException (error: Exception) {
    if (error !== null && error !== undefined) {
      this._runTimeExceptions.push(error)
    }
  }

  @Mutation()
  public removeLogByIndex (index: number) {
    if (index !== null && index !== undefined) {
      this._runTimeExceptions.removeByIndex(index)
    }
  }

  @Getter()
  public get getUnknownException (): Exception[] {
    return this._runTimeExceptions
  }

  @Getter()
  public get getUnknownExceptionLength (): number {
    return this._runTimeExceptions.length
  }
}
