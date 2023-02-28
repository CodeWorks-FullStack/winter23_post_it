import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

export const AlbumMemberSchema = new Schema({
  albumId: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, defaultSchemaOptions)


AlbumMemberSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

AlbumMemberSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})

AlbumMemberSchema.index({ albumId: 1, accountId: 1 }, { unique: true })