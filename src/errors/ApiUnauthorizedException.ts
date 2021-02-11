import { AxiosResponse } from 'axios'
import ApiException from '@/errors/ApiException'
export default class ApiUnauthorizedException extends ApiException {
  // eslint-disable-next-line no-useless-constructor
  constructor (response: AxiosResponse) {
    super(response)
  }
}
