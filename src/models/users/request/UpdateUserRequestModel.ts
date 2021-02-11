export default class UpdateUserRequestModel {
  public id: number

  public firstName: string

  public lastName: string

  public email: string

  constructor (id: number, firstName: string, lastName: string, email: string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }

  public static getInstance (): UpdateUserRequestModel {
    return new UpdateUserRequestModel(null, null, null, null)
  }
}
