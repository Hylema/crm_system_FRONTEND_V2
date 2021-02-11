import { Container } from 'vue-typedi'
import { Getter, Mutation, State } from 'vuex-simple'
import { LocalStorage } from '@/constants'
import StoreModules from '@/store/CreateStoreModules'
import Vuetify from 'vuetify'
import tokens from '@/tokens'

export default class ThemeModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  private get $vuetify (): Vuetify {
    return Container.get(tokens.VUETIFY)
  }

  @State()
  private _themeIsDark: boolean

  @State()
  private _drawerIsMini: boolean

  @Mutation()
  public setDarkTheme (value: boolean): void {
    this._themeIsDark = value
    localStorage.setItem(LocalStorage.THEME.THEME_IS_DARK, JSON.stringify(value))
    this.$vuetify.framework.theme.dark = value
  }

  @Mutation()
  public setDrawer (value: boolean): void {
    this._drawerIsMini = value
    localStorage.setItem(LocalStorage.THEME.DRAWER, JSON.stringify(value))
  }

  @Getter()
  public get getThemeIsDark (): boolean {
    const theme: string = localStorage.getItem(LocalStorage.THEME.THEME_IS_DARK) || null
    if (theme !== null) this._themeIsDark = JSON.parse(theme)
    else this._themeIsDark = false

    return this._themeIsDark as boolean
  }

  @Getter()
  public get getDrawerIsMini (): boolean {
    const drawer: string = localStorage.getItem(LocalStorage.THEME.DRAWER) || null
    if (drawer !== null) this._drawerIsMini = JSON.parse(drawer)
    else this._drawerIsMini = false

    return this._drawerIsMini as boolean
  }
}
