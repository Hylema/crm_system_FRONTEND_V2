import Exception from '@/errors/Exception'
export default class BackendException extends Exception {
  name: string
  message: string
  stack: string
  constructor (error: TypeError) {
    super()
    this.name = error.name
    this.message = error.message
    this.stack = error.stack
  }
}
