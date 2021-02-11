export class LoginRequestModel {
    public email: string

    public password: string

    constructor (email: string, password: string) {
      this.email = email
      this.password = password
    }

    public static getInstance (): LoginRequestModel {
      return new LoginRequestModel('', '')
    }
}
