import { Container } from 'vue-typedi'
import { Routers } from '@/constants'
import DataPageLoadingHelper from '@/helpers/DataPageLoadingHelper'
import StoreModules from '@/store/CreateStoreModules'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router'
import tokens from '@/tokens'

class RouterPlugin {
  constructor (router: VueRouter) {
    this.router = router
  }

  private get $store (): StoreModules {
    return Container.get(tokens.STORE) as StoreModules
  }

  public get getRouter (): VueRouter {
    return this.router
  }

  private readonly router: VueRouter

  public applyMiddleware (): RouterPlugin {
    this.router.beforeEach((to, from, next) => {
      console.log('==============================================================')

      console.log('this.$store.auth.getUserIsAuthorized', this.$store.auth.getUserIsAuthorized)
      console.log('this.$store.auth.getHasAccessAndRefreshToken', this.$store.auth.getHasAccessAndRefreshToken)
      console.log('this.$store.auth.tokensUpdatedLongTime()', this.$store.auth.tokensUpdatedLongTime())
      console.log('this.$store.auth.getUserIsAdmin', this.$store.auth.getUserIsAdmin)

      console.log('to', to)
      console.log('from', from)
      console.log('==============================================================')
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (this.$store.auth.getUserIsAuthorized) {
          next()
        } else {
          if (this.$store.auth.getHasAccessAndRefreshToken) next({ name: 'LoadingApp' })
          else next({ path: '/auth' })
        }
      } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (this.$store.auth.getUserIsAuthorized) {
          next({ path: '/' })
        } else {
          next()
        }
      } else next()
    })

    return this
  }

  public uploadDataBeforeRouterEnter (): RouterPlugin {
    this.router.beforeEach(async (to, from, next) => {
      switch (to.name) {
        case Routers.PROFILE.NAME: await DataPageLoadingHelper.loadProfile(to.params.id); break
      }
      next()
    })

    return this
  }
}

function routerInstall (): VueRouter {
  Vue.use(VueRouter)

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

  Container.set(tokens.ROUTER, router)

  return router
}

const routerPlugin: RouterPlugin = new RouterPlugin(routerInstall())
routerPlugin
  .applyMiddleware()
  .uploadDataBeforeRouterEnter()

export default routerPlugin.getRouter
