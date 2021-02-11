import { BackendUrl } from '@/constants'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import ApiException from '@/errors/ApiException'
import ApiHelper from '@/helpers/ApiHelper'
import ApiUnauthorizedException from '@/errors/ApiUnauthorizedException'
import Exception from '@/errors/Exception'
import NetworkError from '@/errors/NetworkError'
import StoreModules from '@/store/CreateStoreModules'
import Vue from 'vue'
import VueTypeDI, { Container } from 'vue-typedi'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import tokens from '@/tokens'

class AxiosPlugin {
  constructor (axios: AxiosInstance) {
    this.axios = axios
  }

  private get $store (): StoreModules {
    return Container.get(tokens.STORE) as StoreModules
  }

  public get getAxios (): AxiosInstance {
    return this.axios
  }

  private readonly axios: AxiosInstance

  private lastUpdateTokens: Date = new Date()

  /** Проверка последнего раза обновления токена */
  private recentCheck (): boolean {
    return new Date() >= this.lastUpdateTokens
  }

  private async handleUnauthorizedException (error: ApiUnauthorizedException): Promise<AxiosResponse> {
    if (this.recentCheck() && this.$store.auth.getHasAccessAndRefreshToken) {
      this.lastUpdateTokens = new Date(Date.now() + 10000)

      if (await this.$store.auth.actionTryAuthUser()) {
        error.response.config.headers.Authorization = `Bearer ${this.$store.auth.getAccessToken}`
      }

      return await axios.request(error.response.config)
        .then((response: AxiosResponse) => Promise.resolve(response))
        .catch((error: AxiosError) => Promise.reject(error))
    } else return Promise.reject(error)
  }

  private handleBackendException (): void {
    // this.$store.auth.actionCurrentAuthUser().then(() => {
    //   console.log('backend is work')
    //   this.$store.exception.setBackendIsWork(true)
    // }).catch(() => {
    //   console.log('backend is not working')
    //   this.$store.exception.setBackendIsWork(false)
    // })
  }

  private handleNetworkException (): void {
    this.$store.exception.setNetworkError(true)
  }

  public applyHandleApiErrors (): AxiosPlugin {
    axios.interceptors.response.use((response: AxiosResponse) => response,
      (axiosError: AxiosError) => {
        const error: ApiException | Exception = ApiHelper.createError(axiosError)

        if (error instanceof ApiException) {
          switch (true) {
            case error instanceof ApiUnauthorizedException: return this.handleUnauthorizedException(error)
            case error instanceof NetworkError: this.handleNetworkException(); break
            default: {
              console.error('default HandleApiErrors')
              console.log(error)
            }
          }

          if (error instanceof ApiBadRequestException) return Promise.reject(error)
        }
      })

    return this
  }

  public setBackendUrl (url: string): AxiosPlugin {
    this.axios.defaults.baseURL = `${url}/`

    return this
  }
}

function installAxios (): AxiosInstance {
  Vue.prototype.$axios = axios
  Vue.use(VueTypeDI)
  Container.set(tokens.AXIOS, axios)

  return axios
}

const axiosPlugin: AxiosPlugin = new AxiosPlugin(installAxios())

axiosPlugin
  .setBackendUrl(BackendUrl)
  .applyHandleApiErrors()

export default axiosPlugin.getAxios
