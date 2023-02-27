
export class Picture {
  constructor(data) {
    this.id = data.id;
    this.imgUrl = data.imgUrl;

    this.albumId = data.albumId;
    this.creatorId = data.creatorId;
    this.creator = data.creator;
  }
}
