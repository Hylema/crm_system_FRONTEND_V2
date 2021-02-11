import { Getter, Mutation, State } from 'vuex-simple'
import { Injectable } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'

/**
 * Module for loading users
 */
@Injectable()
export default class UsersLoadingModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  /** Loading all Users */
  @State()
  private _loadingUsers = false;

  @Mutation()
  public setLoadingUsers (isLoading: boolean): void {
    this._loadingUsers = isLoading
  }

  @Getter()
  public get getLoadingUsers (): boolean {
    return this._loadingUsers as boolean
  }

  /** Loading Create User */
  @State()
  private _loadingCreateUser = false;

  @Mutation()
  public setLoadingCreateUsers (isLoading: boolean): void {
    this._loadingCreateUser = isLoading
  }

  @Getter()
  public get getLoadingCreateUsers (): boolean {
    return this._loadingCreateUser as boolean
  }

  /** Loading Put User */
  @State()
  private _loadingPutUser = false;

  @Mutation()
  public setLoadingPutUsers (isLoading: boolean): void {
    this._loadingPutUser = isLoading
  }

  @Getter()
  public get getLoadingPutUsers (): boolean {
    return this._loadingPutUser as boolean
  }

  /** Loading Patch User */
  @State()
  private _loadingPatchUser = false;

  @Mutation()
  public setLoadingPatchUsers (isLoading: boolean): void {
    this._loadingPatchUser = isLoading
  }

  @Getter()
  public get getLoadingPatchUsers (): boolean {
    return this._loadingPatchUser as boolean
  }

  /** Loading Delete User */
  @State()
  private _loadingDeleteUser = false;

  @Mutation()
  public setLoadingDeleteUsers (isLoading: boolean): void {
    this._loadingDeleteUser = isLoading
  }

  @Getter()
  public get getLoadingDeleteUsers (): boolean {
    return this._loadingDeleteUser as boolean
  }
}
