import { Injectable } from 'vue-typedi'
import { Module } from 'vuex-simple'
import AuthLoadingModule from '@/store/modules/loading/AuthLoadingModule'
import PageLoadingModule from '@/store/modules/loading/PageLoadingModule'
import StoreModules from '@/store/CreateStoreModules'
import UsersLoadingModule from '@/store/modules/loading/UsersLoadingModule'

/**
 * Module talking about loading any request
 */
@Injectable()
export default class LoadingModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @Module()
  public auth = new AuthLoadingModule(this.rootStore)

  @Module()
  public users = new UsersLoadingModule(this.rootStore)

  @Module()
  public page = new PageLoadingModule(this.rootStore)
}
