export interface Response {
  errors: object;
  route: string;
}

export default class WebSocketErrorMessageModel {
  public errors: object

  public route: string

  constructor (
    errors: object,
    route: string
  ) {
    this.errors = errors
    this.route = route
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static fromJson (response: Response): WebSocketErrorMessageModel {
    return new WebSocketErrorMessageModel(
      response.errors,
      response.route
    )
  }

  toJson (): Record<string, unknown> {
    return {
      errors: this.errors,
      route: this.route
    }
  }
}
