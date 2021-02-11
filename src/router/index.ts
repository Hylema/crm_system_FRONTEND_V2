import { RouteConfig } from 'vue-router'
import { Routers } from '@/constants'

const routes: Array<RouteConfig> = [
  {
    path: Routers.AUTH.PATH,
    name: Routers.AUTH.NAME,
    component: () => import('@/views/auth/Auth.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: Routers.APP.PATH,
    name: Routers.APP.NAME,
    component: () => import('@/layouts/app/AppLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: Routers.MAIN.PATH,
        name: Routers.MAIN.NAME,
        component: () => import('@/views/main/Main.vue')
      },
      {
        path: Routers.PROFILE.PATH,
        name: Routers.PROFILE.NAME,
        component: () => import('@/views/profile/Profile.vue')
      },
      {
        path: Routers.ADMIN.PATH,
        name: Routers.ADMIN.NAME,
        component: () => import('@/views/admin/Administration.vue'),
        children: [
          {
            path: Routers.USERS.PATH,
            name: Routers.USERS.NAME,
            component: () => import('@/views/users/Users.vue')
          }
        ]
      },
      {
        path: Routers.NOTFOUND.PATH,
        name: Routers.NOTFOUND.NAME,
        component: () => import('@/views/error/NotFound.vue')
      }
    ]
  },
  {
    path: Routers.LOADING.PATH,
    name: Routers.LOADING.NAME,
    component: () => import('@/views/loading/LoadingApp.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

export default routes
