import { Getter, Mutation, State } from 'vuex-simple'
import { Injectable } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'

/**
 * Loading for all pages
 */
@Injectable()
export default class PageLoadingModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @State()
  private _pageLoading = false;

  @Mutation()
  public setPageLoading (isLoading: boolean): void {
    this._pageLoading = isLoading
  }

  @Getter()
  public get getPageLoading (): boolean {
    return this._pageLoading as boolean
  }
}
