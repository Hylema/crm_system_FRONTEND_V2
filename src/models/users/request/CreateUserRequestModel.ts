export default class CreateUserRequestModel {
  public roleIds: Array<number>

  public firstName: string

  public lastName: string

  public email: string

  constructor (roleIds: Array<number>, firstName: string, lastName: string, email: string) {
    this.roleIds = roleIds
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }

  public static getInstance (): CreateUserRequestModel {
    return new CreateUserRequestModel([], '', '', '')
  }
}
