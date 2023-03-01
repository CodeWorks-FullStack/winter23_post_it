import { Profile } from "./Account.js";

export class Album {

  constructor (data) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.archived = data.archived;
    this.coverImg = data.coverImg;
    this.creatorId = data.creatorId;
    this.creator = new Profile(data.creator);
    this.albumMemberCount = data.albumMemberCount || 0;
  }

}

export class CollabAlbum extends Album {
  constructor (data) {
    super(data.album)
    this.collaboratorId = data.id
  }
}