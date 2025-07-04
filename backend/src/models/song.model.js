import { text } from "express";
import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const songSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		audioUrl: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		lyrics: {
			type: String,
			required: false,
		},
		albumId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album",
			required: false,
		}
	},
	{ timestamps: true }
);

songSchema.plugin(aggregatePaginate);

export const Song = mongoose.model("Song", songSchema);
