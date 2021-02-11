import { AxiosResponse } from 'axios'
import { Field } from '@/constants'
import ApiException from '@/errors/ApiException'
import ApiValidationException from '@/errors/interfaces/ApiValidationException'
export default class ApiBadRequestException extends ApiException {
  errors: Record<string, Array<ApiValidationException>> = {}

  constructor (response: AxiosResponse) {
    super(response)
    console.debug(this.errors, 'this.erros')
    if (response.data.errors !== null && response.data.errors !== undefined) {
      const errors: Array<ApiValidationException> = response.data.errors

      for (const error of errors) {
        switch (error.field) {
          case Field.EMAIL: this.addNewError(Field.EMAIL, error); break
          case Field.PASSWORD: this.addNewError(Field.PASSWORD, error); break
          case Field.FIRSTNAME: this.addNewError(Field.FIRSTNAME, error); break
          case Field.LASTNAME: this.addNewError(Field.LASTNAME, error); break
        }
      }
    }
    console.debug(this.errors, 'this.erros')
  }

  private addNewError (field: string, error: ApiValidationException): void {
    if (this.errors[field] !== null && this.errors[field] !== undefined) this.errors[field].push(error)
    else this.errors[field] = new Array(error)
  }
}
