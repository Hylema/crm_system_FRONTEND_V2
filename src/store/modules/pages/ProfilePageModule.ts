import { Action, Getter, Mutation, State } from 'vuex-simple'
import { Injectable } from 'vue-typedi'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import StoreModules from '@/store/CreateStoreModules'
import User from '@/models/users/User'

@Injectable()
export default class ProfilePageModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @State()
  private _user: User

  @Action()
  public async actionBeforeRouteEnter (id: string): Promise<void> {
    const response: Either<ApiBadRequestException, User> = await this.rootStore.users.actionGetUserById(id)
    if (response.isOk && response.value instanceof User) this.setUser(response.value)
  }

  @Mutation()
  public setUser (user: User): void {
    this._user = user
  }

  @Getter()
  public get getUser (): User {
    return this._user
  }
}
