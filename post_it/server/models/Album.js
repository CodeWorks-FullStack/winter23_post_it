import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const AlbumSchema = new Schema({

  title: basicStringType,
  category: { ...basicStringType, enum: ['cars', 'animals', 'pokemon', 'misc', 'fish', 'food', 'germs', 'coding', 'games'], default: 'misc' },
  coverImg: { ...basicStringType, maxLength: 5000 },
  archived: { type: Boolean, default: false, required: true },

  // UNDERSTAND THIS relationships are important 💘
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

}, defaultSchemaOptions)


AlbumSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})
// NOTE use this album's id to find all of the albumMembers that have this as their albumId
AlbumSchema.virtual('albumMemberCount', {
  localField: '_id',
  foreignField: 'albumId',
  count: true,
  ref: 'AlbumMember'
})

