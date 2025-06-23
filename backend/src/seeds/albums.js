import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "City Rain",
				artist: "Urban Echo",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
				lyrics: "Đoàn quân Việt Nam đi chung lòng cứu quốc, bước chân dồn vang trên đường gập ghềnh xa, cờ in máu chiến thắng mang hồn nước, súng ngoài xa chen khúc quân hành ca, đường vinh quang xây xác quân thù, thắng gian lao cùng nhau lập chiến khu, vì nhân dân chiến đấu không ngừng, tiến mau ra sa trường. Tiến lên, cùng tiến lên, nước non Việt Nam ta vững bền.Đoàn quân Việt Nam đi, sao vàng phấp phới. Dắt giống nòi quê hương qua nơi lầm lan. Cùng chung sức phấn đấu xây đời mới. Đứng đều lên gông xích ta đập tan. Từ bao lâu ta nuốt căm hờn. quyết hy sinh đời ta tươi thăm hơn. Vì nhân dân chiến đấu không ngừng. tiến mau ra sa trường. tiến lên cùng tiến lên Nước non Việt Nam ta vững bền."
			},
			{
				title: "Neon Lights",
				artist: "Night Runners",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
				lyrics: "Bé ơi, ngủ đi Đêm đã khuya rồi Để những giấc mơ đẹp Sẽ luôn bên em Bé ơi, ngủ ngoan Trong tiếng ru ời Vầng trăng, đợi em.Cùng bay vào giấc mơ À ơi, à ơi, à à ơi.Chúc bé ngủ ngon!",
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
				lyrics: "Thấp thoáng ánh mắt đôi môi mang theo hương mê say"
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
				lyrics: "Thấp thoáng ánh mắt đôi môi mang theo hương mê say"
			},
			{
				title: "Summer Daze",
				artist: "Coastal Kids",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
				lyrics: "Em cho anh tan trong miên man quên luôn đi đêm ngày"
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 28, // 0:28
				lyrics: "Chạm nhẹ vội vàng hai ba giây nhưng con tim đâu hay"
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
				lyrics: "Bối rối khẽ lên ngôi yêu thương đong đầy thật đầy"
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
				lyrics: "Có câu ca trong gió hát ngân nga ru trời mây nhẹ nhàng đón ban mai ngang qua trao nụ cười"
			},
			{
				title: "Stay With Me",
				artist: "Sarah Mitchell",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 46, // 0:46
				lyrics: "Nắng đua chen khoe sác vui đùa giữa muôn ngàn hoa dịu dàng đến nhân gian âu yếm tâm hồn người"
			},
			{
				title: "Midnight Drive",
				artist: "The Wanderers",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 41, // 0:41
				lyrics: "Nắng đua chen khoe sác vui đùa giữa muôn ngàn hoa dịu dàng đến nhân gian âu yếm tâm hồn người"
			},
			{
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 27, // 0:27
				lyrics: "Đừng thờ ơ xin hãy lắng nghe và giúp enh trả lời đôi điều còn băn khoăn"
			},
			{
				title: "Lost in Tokyo",
				artist: "Electric Dreams",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
				lyrics: "Nội dung và hình ảnh MV được xây dựng theo hướng cổ tích, trong đó Jack hóa thân thành thần rừng – người có trách nhiệm bảo vệ thiên nhiên. Vào một ngày kia, cô gái xinh đẹp (“nàng thơ xứ Huế Ngọc Trân đóng) xuất hiện trong rừng và hớp hồn thần rừng. Họ dành cho nhau tình cảm trong sáng. Tuy nhiên, sống trong hai thế giới khác biệt, họ không thể ở bên nhau."
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
				lyrics: "Để ngăn cản nhóm người xấu muốn phá hoại thiên nhiên, thần rừng lao vào ngọn lửa đang cháy và hóa thành đom đóm bay lên trời. Hình ảnh những chú đom đóm sáng lấp lánh xuất hiện trong MV là cách Jack thể hiện tình cảm dành cho cộng đồng fan của mình."
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 17, // 0:17
				lyrics: "Ca khúc là lời nhắn nhủ ngọt ngào cho giới trẻ khi con đường tương lai phí trước, hay biết dung hòa, thứ tha hãy cùng nhau vượt qua những trợ ngại của cuộc sống để vươn lên."
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Urban Nights",
				artist: "Various Artists",
				imageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				imageUrl: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				title: "Midnight Sessions",
				artist: "Various Artists",
				imageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 11).map((song) => song._id),
			},
			{
				title: "Eastern Dreams",
				artist: "Various Artists",
				imageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id});
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();
