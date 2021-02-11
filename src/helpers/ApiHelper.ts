import { Api } from '@/constants'
import { AxiosError, AxiosResponse } from 'axios'
import { Container } from 'vue-typedi'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import ApiException from '@/errors/ApiException'
import ApiUnauthorizedException from '@/errors/ApiUnauthorizedException'
import ApiUnknownException from '@/errors/ApiUnknownException'
import Exception from '@/errors/Exception'
import NetworkError from '@/errors/NetworkError'
import StoreModules from '@/store/CreateStoreModules'
import UnknownException from '@/errors/UnknownException'
import tokens from '@/tokens'

export default class ApiHelper {
  private static get $store (): StoreModules {
    return Container.get(tokens.STORE) as StoreModules
  }

  public static createSuccessApiLog (response: AxiosResponse): void {
    this.$store.logger.setNewSuccessResponse(response)
  }

  public static createModelAndLog<Model> (response: AxiosResponse, model: Function, objectKey: string = null): Model {
    this.$store.logger.setNewSuccessResponse(response)

    if (response.data !== null && response.data !== '') {
      return objectKey === null ? model(response.data) : model(response.data[objectKey])
    }
  }

  public static createListModelAndLog<Model> (response: AxiosResponse, model: Function, objectKey: string = null): Array<Model> {
    this.$store.logger.setNewSuccessResponse(response)

    if (response.data !== null && response.data !== '') {
      const data: never[] = objectKey === null ? response.data : response.data[objectKey]

      return Array.from(data.map<Model>((value) => model(value)))
    }
  }

  public static createError (error: any): ApiException | Exception {
    let statusCode: number

    if (error.response !== null && error.response !== undefined) {
      statusCode = error.response.status
    }

    if (statusCode !== null && statusCode !== undefined) return this.createApiException(error)
    else return this.createException(error)
  }

  public static createApiException (axiosError: AxiosError): ApiException {
    switch (axiosError.response.status) {
      case 400: return new ApiBadRequestException(axiosError.response)
      case 401: return new ApiUnauthorizedException(axiosError.response)
      default: return new ApiUnknownException(axiosError.response)
    }
  }

  public static createException (error: any) {
    if (error.message === 'Network Error') return new NetworkError()
    else {
      const unknownException: UnknownException = new UnknownException(error)
      console.error(unknownException, 'unknownException')
      return unknownException
    }
  }

  public static createApiErrorAndLog (response: AxiosResponse): ApiException {
    const error: ApiException | Exception = this.createError(response)
    this.$store.logger.setNewError(error)

    if (error instanceof ApiException) return error
  }

  public static getApiOperationsName (route: AxiosResponse): string {
    for (const [key, value] of Object.entries(Api.toOneObject())) {
      const regex = new RegExp(`(${value.ROUTE})([0-9]*)`)
      const resultRegex: RegExpExecArray = regex.exec(route.config.url)

      const valueHasSameMethod: boolean = value.METHOD !== null && value.METHOD !== undefined &&
        value.METHOD === route.config.method

      const urlHasIndex: boolean = resultRegex !== null && resultRegex.length > 0 && resultRegex[2] !== null &&
        resultRegex[2] !== ''

      if (typeof value === 'object' && urlHasIndex) {
        const urlHasSameIndex = resultRegex[2] !== null && resultRegex[2] !== '' &&
          value.HAS_INDEX_ATTRIBUTE !== undefined && value.HAS_INDEX_ATTRIBUTE !== null &&
          value.HAS_INDEX_ATTRIBUTE === true

        if (urlHasSameIndex && valueHasSameMethod) return value.OPERATION
        else if (urlHasSameIndex && !valueHasSameMethod) return value.OPERATION
      } else if (typeof value === 'object' && regex.test(route.config.url)) {
        if (valueHasSameMethod) return value.OPERATION
        else if (!valueHasSameMethod) return value.OPERATION
      }
    }
  }
}
