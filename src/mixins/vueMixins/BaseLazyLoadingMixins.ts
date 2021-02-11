import { Container } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'
import tokens from '@/tokens'

const store: StoreModules = Container.get(tokens.STORE) as StoreModules

export default (loadData) => {
  store.loading.page.setPageLoading(true)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let loaderCallback = () => {}
  const loadRoute = (to, from, next) => {
    loadData(to, store, (callback) => {
      store.loading.page.setPageLoading(false)
      loaderCallback = callback
      next()
    })
  }
  return {
    beforeRouteEnter: loadRoute,
    beforeRouteUpdate: loadRoute,
    created: function () {
      loaderCallback.apply(this)
    },
    watch: {
      $route: function () {
        loaderCallback.apply(this)
      }
    }
  }
}
