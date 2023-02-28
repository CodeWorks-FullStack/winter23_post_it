import { Profile } from "./Account.js"

export class Collab {
  constructor (data) {
    this.collaboratorId = data.id
    this.accountId = data.accountId
    this.profile = new Profile(data.profile)
  }
}