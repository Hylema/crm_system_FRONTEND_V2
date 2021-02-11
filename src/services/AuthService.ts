import { Api } from '@/constants'
import { LoginRequestModel } from '@/models/auth/request/LoginRequestModel'
import { LoginResponseModel } from '@/models/auth/response/LoginResponseModel'
import { Service } from 'vue-typedi'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import ApiHelper from '@/helpers/ApiHelper'
import RootService from './Service'
import User from '@/models/users/User'
import tokens from '@/tokens'

@Service(tokens.AUTH_SERVICE)
/**
 * Service class for auth user.
 */
export default class AuthService extends RootService {
  /**
   * Login User.
   *
   * @throws ApiException
   * @returns LoginResponseModel with access and refresh token.
 */
  public async login (params: LoginRequestModel): Promise<LoginResponseModel> {
    return await this.$axios.post(Api.AUTH.LOGIN.ROUTE, params)
      .then((response) => ApiHelper.createModelAndLog<LoginResponseModel>(response, LoginResponseModel.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Get current auth User.
   *
   * @throws ApiException
   * @returns CurrentUserResponseModel.
   */
  public async getCurrentAuthUser (): Promise<User> {
    return await this.$axios.get(Api.AUTH.USER.ROUTE)
      .then((response) => ApiHelper.createModelAndLog<User>(response, User.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Сheck token for validity.
   *
   * @throws ApiException
   * @returns boolean.
   */
  public async verifyToken (accessToken: string): Promise<boolean> {
    return await this.$axios.post(Api.AUTH.TOKEN_VERIFY.ROUTE, {
      accessToken: accessToken
    }).then((response) => {
      ApiHelper.createSuccessApiLog(response)
      return true
    })
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Update token by refresh.
   *
   * @throws ApiException
   * @returns LoginResponseModel.
   */
  public async refreshToken (refreshToken: string): Promise<LoginResponseModel> {
    return await this.$axios.post(Api.AUTH.REFRESH_TOKEN.ROUTE, {
      refreshToken: refreshToken
    })
      .then((response) => ApiHelper.createModelAndLog<LoginResponseModel>(response, LoginResponseModel.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }
}
