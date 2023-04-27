import express from "express";
import { getBoard, updateBoard } from "../controllers/tasks.js";
import sendEmail from "../controllers/sendEmail.js";
const router = express.Router();

router.route("/").get(getBoard).patch(updateBoard);
router.post("/sendemail", sendEmail);

export default router;
