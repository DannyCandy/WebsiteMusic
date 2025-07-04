import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";


const uploadToCloudinary = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return result.secure_url;
	} catch (error) {
		console.log("Error in uploadToCloudinary", error);
		throw new Error("Error uploading to cloudinary");
	}
};

export const createSong = async (req, res, next) => {
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload all files" });
		}

		const { title, artist, albumId, duration } = req.body;
		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		const audioUrl = await uploadToCloudinary(audioFile);
		const imageUrl = await uploadToCloudinary(imageFile);

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration,
			albumId: albumId || null,
		});

		await song.save();

		// if song belongs to an album, update the album's songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}
		res.status(201).json(song);
	} catch (error) {
		console.log("Error in createSong", error);
		next(error);
	}
};

export const updateSong = async (req, res, next) => {
	try {
		const { id } = req.params; // Lấy id từ params
		const { title, artist, albumId, duration, lyrics } = req.body;

		// Tìm bài hát theo ID
		const song = await Song.findById(id);
		if (!song) {
			return res.status(404).json({ error: "Song not found" });
		}

		// Kiểm tra và xử lý tệp âm thanh và hình ảnh nếu có
		let audioUrl = song.audioUrl; // Giữ nguyên URL cũ nếu không có tệp mới
		let imageUrl = song.imageUrl; // Giữ nguyên URL cũ nếu không có tệp mới

		if (req.files) {
			if (req.files.audioFile) {
				audioUrl = await uploadToCloudinary(req.files.audioFile);
			}
			if (req.files.imageFile) {
				imageUrl = await uploadToCloudinary(req.files.imageFile);
			}
		}

		// Cập nhật thông tin bài hát
		song.title = title || song.title;
		song.artist = artist || song.artist;
		song.audioUrl = audioUrl;
		song.imageUrl = imageUrl;
		song.duration = duration || song.duration;
		if(albumId){
			if(albumId === "none"){
				song.albumId = null
			}else{
				song.albumId = albumId
			}
		}
		song.lyrics = lyrics || song.lyrics;

		await song.save();

		// Nếu bài hát thuộc về một album, cập nhật mảng bài hát của album
		if (albumId && albumId !== "none") {
			await Album.findByIdAndUpdate(albumId, {
				$addToSet: { songs: song._id }, // Thêm bài hát vào album nếu chưa có
			});
		}

		res.status(204).end();
	} catch (error) {
		console.log("Error in updateSong", error);
		next(error);
	}
};


export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id);

		// if song belongs to an album, update the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id);

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleteSong", error);
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const updateAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, artist, releaseYear } = req.body;
		const imageFile = req.files?.imageFile;

		if (!id) {
			return res.status(400).json({ error: "albumId is required" });
		}

		const album = await Album.findById(id);
		if (!album) {
			return res.status(404).json({ error: "Album not found" });
		}

		// Cập nhật các trường nếu có
		if (title) album.title = title;
		if (artist) album.artist = artist;
		if (releaseYear) album.releaseYear = releaseYear;

		// Nếu có ảnh mới, upload và thay thế
		if (imageFile) {
			const imageUrl = await uploadToCloudinary(imageFile);
			album.imageUrl = imageUrl;
		}

		await album.save();

		res.status(204).end();
	} catch (error) {
		console.log("Error in updateAlbum", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAlbum", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};

export const getAllAlbums = async (req, res, next) => {
	try {
		const albums = await Album.find()
		.sort({ createdAt: -1 }) 
		res.status(200).json(albums);
	} catch (error) {
		next(error);
	}
};