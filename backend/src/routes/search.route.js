import { Router } from "express";
import { fulltextSearch } from "../controller/search.controller.js";

const router = Router();

router.get("/", fulltextSearch);

export default router;
