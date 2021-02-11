import { createVuexStore, useStore } from 'vuex-simple'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { Container } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'
import tokens from '@/tokens'

function install (): Store<unknown> {
  Vue.use(Vuex)

  const createStore: Store<unknown> = createVuexStore(new StoreModules())
  const createModuleStore: StoreModules = useStore(createStore)

  Vue.prototype.$storeModules = createModuleStore
  Container.set(tokens.STORE, createModuleStore)

  return createStore
}

const store: Store<unknown> = install()

export default store
