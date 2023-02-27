import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const AlbumSchema = new Schema({

  title: basicStringType,
  category: { ...basicStringType, enum: ['cars', 'animals', 'pokemon', 'misc', 'fish', 'food', 'germs', 'coding', 'games'] },
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

