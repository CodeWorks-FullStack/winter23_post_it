import { Profile } from "./Account.js"

export class CollabProfile extends Profile {
  constructor (data) {
    super(data.profile)
    this.collaboratorId = data.id
  }
}