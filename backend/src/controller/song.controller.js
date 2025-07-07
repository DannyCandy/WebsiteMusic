import mongoose from "mongoose";
import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
	try {
		// -1 = Descending => newest -> oldest
		// 1 = Ascending => oldest -> newest
		const songs = await Song.find().sort({ createdAt: -1 });
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getAllSongsWithConditions = async (req, res, next) => {
	try {
		const { page = 1, limit = 8, sortBy = "createdAt", order = "asc" } = req.query;
		const sortDirection = order === "asc" ? 1 : -1;

		// Tạo pipeline
		const pipeline = [
			{
				$lookup: {
					from: "albums",
					localField: "albumId",
					foreignField: "_id",
					as: "album"
				}
			},
			{
				$unwind: {
					path: "$album",
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$project: {
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
					duration: 1,
					createdAt: 1,
					albumName: "$album.title", // hoặc bạn có thể dùng album nếu cần thêm nhiều trường
				}
			},
			{
				$sort: { [sortBy]: sortDirection }
			},
		];

		// Dùng aggregatePaginate
		const options = {
			page: parseInt(page),
			limit: parseInt(limit)
		};

		const aggregate = Song.aggregate(pipeline);
		const songs = await Song.aggregatePaginate(aggregate, options);
		await new Promise(resolve => setTimeout(resolve, 5000));
		res.json(songs);
	} catch (error) {
		next(error);
	}
}

export const getFeaturedSongs = async (req, res, next) => {
	try {
		// fetch 6 random songs using mongodb's aggregation pipeline
		// const songs = await Song.aggregate([
		// 	{
		// 		$sample: { size: 6 },
		// 	},
		// 	{
		// 		$project: {
		// 			_id: 1,
		// 			title: 1,
		// 			artist: 1,
		// 			imageUrl: 1,
		// 			audioUrl: 1,
		// 		},
		// 	},
		// ]);
		const songs = await Song.find()
		.sort({ _id: 1 }) // sắp xếp theo _id tăng dần (mặc định)
		.limit(6);


		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getMadeForYouSongs = async (req, res, next) => {
	try {
		// const songs = await Song.aggregate([
		// 	{
		// 		$sample: { size: 4 },
		// 	},
		// 	{
		// 		$project: {
		// 			_id: 1,
		// 			title: 1,
		// 			artist: 1,
		// 			imageUrl: 1,
		// 			audioUrl: 1,
		// 		},
		// 	},
		// ]);
		const songs = await Song.find()
		.sort({ _id: 1 })
		.skip(6)
		.limit(4);


		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getTrendingSongs = async (req, res, next) => {
	try {
		// const songs = await Song.aggregate([
		// 	{
		// 		$sample: { size: 4 },
		// 	},
		// 	{
		// 		$project: {
		// 			_id: 1,
		// 			title: 1,
		// 			artist: 1,
		// 			imageUrl: 1,
		// 			audioUrl: 1,
		// 		},
		// 	},
		// ]);
		const songs = await Song.find()
		.sort({ _id: 1 })
		.skip(10)
		.limit(4);


		res.json(songs);
	} catch (error) {
		next(error);
	}
};
export const getSongById = async (req, res, next) => {
    try {
		const id = req.query.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid song ID" });
		}
		const song = await Song.findById(id);
		if (!song) {
			return res.status(404).json({ message: "Song not found" });
		}
		res.status(200).json(song);
    } catch (error) {
        next(error);
    }
};