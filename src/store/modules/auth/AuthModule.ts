import { Action, Getter, Mutation, State } from 'vuex-simple'
import { AxiosInstance } from 'axios'
import { Container, Inject, Injectable } from 'vue-typedi'
import { LocalStorage } from '@/constants'
import { LoginRequestModel } from '@/models/auth/request/LoginRequestModel'
import { LoginResponseModel } from '@/models/auth/response/LoginResponseModel'
import { left, right } from 'either-ts'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import ApiException from '@/errors/ApiException'
import AuthService from '@/services/AuthService'
import Exception from '@/errors/Exception'
import StoreModules from '@/store/CreateStoreModules'
import User from '@/models/users/User'
import VueRouter from 'vue-router'
import tokens from '@/tokens'

/**
 * Module for auth users
 */
@Injectable()
export default class AuthModule {
  // eslint-disable-next-line no-useless-constructor
  constructor (private rootStore: StoreModules) {}

  @Inject(tokens.AUTH_SERVICE)
  private authService!: AuthService

  private get $axios (): AxiosInstance {
    return Container.get(tokens.AXIOS) as AxiosInstance
  }

  private get $router (): VueRouter {
    return Container.get(tokens.ROUTER) as VueRouter
  }

  /** Время последнего раза обновление токена */
  public tokensUpdatedLongTime (): boolean {
    const currentDate: number = new Date().getTime()

    if (this.getLastUpdateToken) return currentDate > new Date(this.getLastUpdateToken).getTime()
    else return true
  }

  @State()
  private _currentAuthUser: User

  @State()
  private _lastUpdateToken: Date

  @State()
  private _userIsAuthorized: boolean

  @State()
  private _accessToken: string

  @State()
  private _refreshToken: string

  @State()
  private _userIsAdmin: boolean

  @Action()
  public async actionTryAuthUser (): Promise<boolean> {
    console.log('actionTryAuthUser')
    console.log('this.getHasAccessAndRefreshToken', this.getHasAccessAndRefreshToken)
    if (this.getHasAccessAndRefreshToken) {
      const tokenVerify: Either<Exception | ApiException, boolean> = await this.actionVerifyToken()
      console.log('tokenVerify.isOk', tokenVerify.isOk)
      if (tokenVerify.isOk) return true
      else if (tokenVerify.value instanceof ApiException) {
        const refreshToken: Either<Exception | ApiException, LoginResponseModel> = await this.actionRefreshTokens()
        if (refreshToken.isOk) {
          console.log('refreshToken.isOk', refreshToken.isOk)
          return true
        }
      }
    }

    console.log('removeAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorizationremoveAuthorization')

    this.removeAuthorization()
    await this.$router.push({ name: 'Auth' })
    return false
  }

  @Action()
  public async actionLogin (loginRequestParams: LoginRequestModel): Promise<Either<ApiBadRequestException, boolean>> {
    this.rootStore.loading.auth.setLoadingWhenUserLoginIn(true)

    const result: Either<ApiBadRequestException, boolean> = await this.authService.login(loginRequestParams)
      .then(async (response: LoginResponseModel) => {
        this.setAuthorization(response)
        await this.actionCurrentAuthUser()

        return right<ApiBadRequestException, boolean>(true)
      }).catch((error: ApiBadRequestException) => left(error))

    this.rootStore.loading.auth.setLoadingWhenUserLoginIn(false)

    return result
  }

  @Action()
  public async actionVerifyToken (): Promise<Either<ApiBadRequestException, boolean>> {
    return await this.authService.verifyToken(this.getAccessToken).then((response: boolean) => {
      this.setAuthorizationUser(response)

      return right<ApiBadRequestException, boolean>(response)
    }).catch((error: ApiBadRequestException) => left(error))
  }

  @Action()
  public async actionRefreshTokens (): Promise<Either<ApiBadRequestException, LoginResponseModel>> {
    return await this.authService.refreshToken(this.getRefreshToken).then(async (response: LoginResponseModel) => {
      this.setAuthorization(response)
      await this.actionCurrentAuthUser()

      return right<ApiBadRequestException, LoginResponseModel>(response)
    }).catch((error: ApiBadRequestException) => left(error))
  }

  @Action()
  public async actionCurrentAuthUser (): Promise<User> {
    return await this.authService.getCurrentAuthUser().then((user: User) => {
      if (user !== undefined) {
        this.setCurrentAuthUser(user)

        return user
      }
    })
  }

  @Mutation()
  public setAuthorization ({ accessToken, refreshToken }: LoginResponseModel): void {
    this._accessToken = accessToken
    this._refreshToken = refreshToken

    this.setAuthorizationUser(true)

    const lastUpdate: Date = new Date(Date.now() + (2 * 60 * 10 * 1000))
    this._lastUpdateToken = lastUpdate

    localStorage.setItem(LocalStorage.AUTH.ACCESS_TOKEN, accessToken)
    localStorage.setItem(LocalStorage.AUTH.REFRESH_TOKEN, refreshToken)
    localStorage.setItem(LocalStorage.AUTH.LAST_UPDATE_TOKENS, JSON.stringify(lastUpdate))

    this.setHttpAccessToken()
  }

  @Mutation()
  public setHttpAccessToken (): void {
    if (this.getAccessToken != null) {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.getAccessToken}`
    }
  }

  @Mutation()
  public setCurrentAuthUser (user: User): void {
    console.log(user, 'current user')
    localStorage.setItem(LocalStorage.AUTH.CURRENT_USER, JSON.stringify(user))

    this._currentAuthUser = user

    user.roles.forEach(role => {
      if (role.role === 'ROLE_ADMIN') {
        this._userIsAdmin = true
        localStorage.setItem(LocalStorage.AUTH.USER_IS_ADMIN, JSON.stringify(true))
      }
    })
  }

  @Mutation()
  public removeAuthorization (): void {
    this._accessToken = null
    this._refreshToken = null
    this._userIsAdmin = null
    this._lastUpdateToken = null
    this._currentAuthUser = null

    this.setAuthorizationUser(false)

    localStorage.removeItem(LocalStorage.AUTH.ACCESS_TOKEN)
    localStorage.removeItem(LocalStorage.AUTH.REFRESH_TOKEN)
    localStorage.removeItem(LocalStorage.AUTH.LAST_UPDATE_TOKENS)
    localStorage.removeItem(LocalStorage.AUTH.USER_IS_ADMIN)
    localStorage.removeItem(LocalStorage.AUTH.CURRENT_USER)

    this.$axios.defaults.headers.common.Authorization = ''
  }

  @Mutation()
  public setAuthorizationUser (value: boolean): void {
    this._userIsAuthorized = value
  }

  @Getter()
  private get getLastUpdateToken (): Date | null {
    const tokensJson: string = localStorage.getItem(LocalStorage.AUTH.LAST_UPDATE_TOKENS) || null
    if (tokensJson !== null) this._lastUpdateToken = JSON.parse(tokensJson)

    return this._lastUpdateToken as Date
  }

  @Getter()
  public get getCurrentAuthUser (): User | null {
    const user: string = localStorage.getItem(LocalStorage.AUTH.CURRENT_USER) || null
    if (user !== null) this._currentAuthUser = JSON.parse(user)

    return this._currentAuthUser as User
  }

  @Getter()
  public get getAccessToken (): string {
    this._accessToken = localStorage.getItem(LocalStorage.AUTH.ACCESS_TOKEN) || null

    return this._accessToken as string
  }

  @Getter()
  public get getRefreshToken (): string {
    this._refreshToken = localStorage.getItem(LocalStorage.AUTH.REFRESH_TOKEN) || null

    return this._refreshToken
  }

  @Getter()
  public get getUserIsAdmin (): boolean {
    const userIsAdmin: string = localStorage.getItem(LocalStorage.AUTH.USER_IS_ADMIN) || null
    if (userIsAdmin !== null) this._userIsAdmin = JSON.parse(userIsAdmin)

    return this._userIsAdmin as boolean
  }

  @Getter()
  public get getUserIsAuthorized (): boolean {
    if (this._userIsAuthorized === null || this._userIsAuthorized === undefined) this._userIsAuthorized = false
    return this._userIsAuthorized as boolean
  }

  @Getter()
  public get getHasAccessToken (): boolean {
    return Boolean(this.getAccessToken && this.getAccessToken.length > 0)
  }

  @Getter()
  public get getHasRefreshToken (): boolean {
    return Boolean(this.getRefreshToken && this.getRefreshToken.length > 0)
  }

  @Getter()
  public get getHasAccessAndRefreshToken (): boolean {
    console.log(this.getHasAccessToken, 'this.getHasAccessToken')
    console.log(this.getHasRefreshToken, 'this.getHasRefreshToken')
    return Boolean(this.getHasAccessToken && this.getHasRefreshToken)
  }
}
