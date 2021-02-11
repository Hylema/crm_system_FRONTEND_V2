import { Action, Getter, Mutation, State } from 'vuex-simple'
import { Inject, Injectable } from 'vue-typedi'
import { left, right } from 'either-ts'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import CreateUserRequestModel from '@/models/users/request/CreateUserRequestModel'
import StoreModules from '@/store/CreateStoreModules'
import UpdateUserRequestModel from '@/models/users/request/UpdateUserRequestModel'
import User from '@/models/users/User'
import UsersService from '@/services/UsersService'
import Vue from 'vue'
import tokens from '@/tokens'

/**
 * Module for auth users
 */
@Injectable()
export default class UsersModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @Inject(tokens.USERS_SERVICE)
  private usersService!: UsersService

  @State()
  private _allUsers: User[] = []

  @Action()
  public async actionGetAllUsers (): Promise<void> {
    await this.usersService.getAllUsers().then((response: User[]) => {
      console.log(response, 'USERS')
      this._allUsers = response
    })
  }

  @Action()
  public async actionGetUserById (id: string): Promise<Either<ApiBadRequestException, User>> {
    return await this.usersService.getUserById(id)
      .then((user: User) => right<ApiBadRequestException, User>(user))
      .catch((error: ApiBadRequestException) => left(error))
  }

  @Action()
  public async actionCreateUser (model: CreateUserRequestModel): Promise<Either<ApiBadRequestException, User>> {
    this.rootStore.loading.users.setLoadingCreateUsers(true)

    const result: Either<ApiBadRequestException, User> = await this.usersService.createUser(model)
      .then((response: User) => right<ApiBadRequestException, User>(response))
      .catch((error: ApiBadRequestException) => left(error))

    this.rootStore.loading.users.setLoadingCreateUsers(false)

    return result
  }

  @Action()
  public async actionPutUser (model: UpdateUserRequestModel): Promise<Either<ApiBadRequestException, User>> {
    this.rootStore.loading.users.setLoadingPutUsers(true)

    const result: Either<ApiBadRequestException, User> = await this.usersService.putUser(model)
      .then((response: User) => right<ApiBadRequestException, User>(response))
      .catch((error: ApiBadRequestException) => left(error))

    this.rootStore.loading.users.setLoadingPutUsers(false)

    return result
  }

  @Action()
  public async actionPatchUser (model: UpdateUserRequestModel): Promise<Either<ApiBadRequestException, User>> {
    this.rootStore.loading.users.setLoadingPatchUsers(true)

    const result: Either<ApiBadRequestException, User> = await this.usersService.patchUser(model)
      .then((response: User) => right<ApiBadRequestException, User>(response))
      .catch((error: ApiBadRequestException) => left(error))

    this.rootStore.loading.users.setLoadingPatchUsers(false)

    return result
  }

  @Action()
  public async actionDeleteUser (id: number): Promise<Either<ApiBadRequestException, User>> {
    this.rootStore.loading.users.setLoadingDeleteUsers(true)

    const result: Either<ApiBadRequestException, User> = await this.usersService.deleteUser(id)
      .then((response: User) => right<ApiBadRequestException, User>(response))
      .catch((error: ApiBadRequestException) => left(error))

    this.rootStore.loading.users.setLoadingDeleteUsers(false)

    return result
  }

  @Mutation()
  public setCreatedUser (user: User): void {
    this._allUsers.push(user)
    console.info(user, 'setCreatedUser')
  }

  @Mutation()
  public setUpdatedUser (user: User): void {
    console.info(user, 'setUpdatedUser')
    const users: User[] = this._allUsers

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        Vue.set(users, i, user)
      }
    }
  }

  @Mutation()
  public setDeletedUser (user: User): void {
    console.info(user, 'setDeletedUser')
    const users: User[] = this._allUsers

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        Vue.delete(users, i)
      }
    }
  }

  @Getter()
  public get getAllUsers (): User[] {
    return this._allUsers
  }
}
