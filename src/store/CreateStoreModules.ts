import { Module } from 'vuex-simple'
import AuthModule from '@/store/modules/auth/AuthModule'
import BackendErrosModule from '@/store/modules/BackendErrosModule'
import LoadingModule from '@/store/modules/loading/LoadingModule'
import LoggerModule from '@/store/modules/logger/LoggerModule'
import PagesModule from '@/store/modules/pages/PagesModule'
import ThemeModule from '@/store/modules/theme/ThemeModule'
import UsersModule from '@/store/modules/users/UsersModule'

/**
 * RootStore connects all modules of the project
 */
export default class CreateStoreModules {
    @Module()
    public auth = new AuthModule(this)

    @Module()
    public exception = new BackendErrosModule(this)

    @Module()
    public logger = new LoggerModule(this)

    @Module()
    public loading = new LoadingModule(this)

    @Module()
    public users = new UsersModule(this)

    @Module()
    public theme = new ThemeModule(this)

    @Module()
    public page = new PagesModule(this)
}
