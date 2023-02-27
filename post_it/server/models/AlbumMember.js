import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

export const AlbumMemberSchema = new Schema({
  albumId: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, defaultSchemaOptions)
