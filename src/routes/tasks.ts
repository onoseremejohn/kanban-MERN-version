import express from "express";
import { getBoard, updateBoard } from "../controllers/tasks.js";

const router = express.Router();

router.route("/").get(getBoard).patch(updateBoard);

export default router;
