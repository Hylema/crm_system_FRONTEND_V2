import { Injectable } from 'vue-typedi'
import { Module } from 'vuex-simple'
import ProfilePageModule from '@/store/modules/pages/ProfilePageModule'
import StoreModules from '@/store/CreateStoreModules'

/**
 * Module for storing global page data. Was created in order to transfer some data between components and,
 * first of all, to save data before the user enters the route
 */
@Injectable()
export default class PagesModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @Module()
  public profile = new ProfilePageModule(this.rootStore)
}
