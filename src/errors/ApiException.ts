import { AxiosResponse } from 'axios'

export default class ApiException {
  statusCode: number
  response: AxiosResponse

  constructor (response: AxiosResponse) {
    this.response = response
    this.statusCode = response.status
  }
}
