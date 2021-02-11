import { Api } from '@/constants'
import { AxiosError } from 'axios'
import { Service } from 'vue-typedi'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import ApiException from '@/errors/ApiException'
import ApiHelper from '@/helpers/ApiHelper'
import CreateUserRequestModel from '@/models/users/request/CreateUserRequestModel'
import RootService from './Service'
import UpdateUserRequestModel from '@/models/users/request/UpdateUserRequestModel'
import User from '@/models/users/User'
import tokens from '@/tokens'

@Service(tokens.USERS_SERVICE)
/**
 * Service class for users.
 */
export default class UsersService extends RootService {
  /**
   * Get All users.
   *
   * @throws ApiException
   * @returns list users.
   */
  public async getAllUsers (): Promise<User[]> {
    return await this.$axios.get(Api.USERS.GET_ALL_USERS.ROUTE)
      .then((response) => ApiHelper.createListModelAndLog<User>(response, User.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Get user by id.
   *
   * @throws ApiException
   * @returns user.
   */
  public async getUserById (id: string): Promise<User> {
    return await this.$axios.get(Api.USERS.GET_USER_BY_ID.ROUTE + id)
      .then((response) => ApiHelper.createModelAndLog<User>(response, User.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Create User.
   *
   * @throws ApiException
   * @returns user.
   */
  public async createUser (model: CreateUserRequestModel): Promise<User> {
    return await this.$axios.post(Api.USERS.CREATE_USER.ROUTE, model)
      .then((response) => ApiHelper.createModelAndLog<User>(response, User.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Patch User.
   *
   * @throws ApiException
   * @returns user.
   */
  public async patchUser (model: UpdateUserRequestModel): Promise<User> {
    return await this.$axios.patch(Api.USERS.PATCH_USER.ROUTE + model.id, model)
      .then((response) => ApiHelper.createModelAndLog<User>(response, User.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Put User.
   *
   * @throws ApiException
   * @returns user.
   */
  public async putUser (model: UpdateUserRequestModel): Promise<User> {
    return await this.$axios.put(Api.USERS.PUT_USER.ROUTE + model.id, model)
      .then((response) => ApiHelper.createModelAndLog<User>(response, User.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }

  /**
   * Delete User.
   *
   * @throws ApiException
   * @returns user.
   */
  public async deleteUser (id: number): Promise<User> {
    return await this.$axios.delete(Api.USERS.DELETE_USER.ROUTE + id)
      .then((response) => ApiHelper.createModelAndLog<User>(response, User.fromJson))
      .catch((error: ApiBadRequestException) => {
        throw error
      })
  }
}
