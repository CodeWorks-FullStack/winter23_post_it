import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AlbumSchema } from '../models/Album.js';
import { AlbumMemberSchema } from '../models/AlbumMember.js';
import { PictureSchema } from '../models/Picture.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  // REVIEW remember to pluralize the left-hand side not the right
  Albums = mongoose.model('Album', AlbumSchema)

  Pictures = mongoose.model('Picture', PictureSchema)

  AlbumMembers = mongoose.model('AlbumMember', AlbumMemberSchema)

}

export const dbContext = new DbContext()
