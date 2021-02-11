import Exception from '@/errors/Exception'

export default class UnknownException extends Exception {
  public error: string
  constructor (error: unknown) {
    super()
    this.error = `${error}`
  }
}
