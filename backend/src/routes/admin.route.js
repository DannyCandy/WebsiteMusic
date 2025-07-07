import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong, getAllAlbums, getAllSongs, updateAlbum, updateSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs/create", createSong);
router.delete("/songs/:id", deleteSong);
router.put("/songs/update/:id", updateSong);
router.get("/songs", getAllSongs);

router.post("/albums/create", createAlbum);
router.put("/albums/update/:id", updateAlbum);
router.delete("/albums/:id", deleteAlbum);
router.get("/albums", getAllAlbums);

export default router;
