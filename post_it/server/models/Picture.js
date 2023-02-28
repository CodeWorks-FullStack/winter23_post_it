import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const PictureSchema = new Schema({

  imgUrl: { ...basicStringType, maxLength: 5000, },
  bgColor: { ...basicStringType, enum: ['blue', 'purple', 'chartreuse', 'bisque', 'orange', 'yellow', 'indigo', 'pink'], default: 'pink' },

  // RELATIONSHIPS 😍
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' }

}, defaultSchemaOptions)

PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})