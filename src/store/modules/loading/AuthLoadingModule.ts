import { Getter, Mutation, State } from 'vuex-simple'
import { Injectable } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'

/**
 * Module talking about loading loginIn
 */
@Injectable()
export default class AuthLoadingModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

    @State()
    private loadingWhenUserLoginIn = false;

    @Mutation()
    public setLoadingWhenUserLoginIn (isLoading: boolean): void {
      this.loadingWhenUserLoginIn = isLoading
    }

    @Getter()
    public get getLoadingWhenUserLoginIn (): boolean {
      return this.loadingWhenUserLoginIn as boolean
    }
}
