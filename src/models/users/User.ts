import File from '@/models/interfaces/File'
import Role from '@/models/interfaces/Role'

interface Response {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastVisit: string;
  roles: Array<Role>;
  avatar: File;
  created: Date;
  updated: Date;
}

export default class User {
  public id: number
  public firstName: string
  public lastName: string
  public email: string
  public lastVisit: string
  public roles: Array<Role>
  public avatar: File
  public created: Date
  public updated: Date

  constructor (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    lastVisit: string,
    roles: Array<Role>,
    avatar: File,
    created: Date,
    updated: Date
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.lastVisit = lastVisit
    this.roles = roles
    this.avatar = avatar
    this.created = created
    this.updated = updated
  }

  public static fromJson (response: Response): User {
    return new User(
      response.id,
      response.firstName,
      response.lastName,
      response.email,
      response.lastVisit,
      response.roles,
      response.avatar,
      response.created,
      response.updated
    )
  }

  public static getInstance (): User {
    return new User(null, null, null, null,
      null, null, null, null, null)
  }

  public toJson (): Record<string, unknown> {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      lastVisit: this.lastVisit,
      roles: this.roles,
      avatar: this.avatar,
      created: this.created,
      updated: this.updated
    }
  }
}
