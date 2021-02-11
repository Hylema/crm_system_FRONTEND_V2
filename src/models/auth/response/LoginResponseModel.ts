export interface Response {
    access_token: string;
    refresh_token: string;
}

export class LoginResponseModel {
    public accessToken: string

    public refreshToken: string

    constructor (
      accessToken: string,
      refreshToken: string
    ) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static fromJson (response: Response): LoginResponseModel {
      return new LoginResponseModel(
        response.access_token,
        response.refresh_token
      )
    }

    toJson (): Record<string, unknown> {
      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken
      }
    }
}
