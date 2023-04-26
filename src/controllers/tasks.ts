import { Controller } from "../types.js";
import { StatusCodes } from "http-status-codes";
import { defaultBoard, Main } from "../utils.js";
import Board from "../models/Taskboard.js";

interface Save extends Main {
  createdBy?: String;
}

const getBoard: Controller = async (req, res) => {
  const board = await Board.findOne({ createdBy: req.user?.userId }).select(
    "-createdBy -_id"
  );
  if (!board) {
    const save: Save = { ...defaultBoard };
    save.createdBy = req.user?.userId;
    const board = await Board.create(save);
    const response = await Board.findById(board._id).select("-createdBy -_id");
    res.status(StatusCodes.CREATED).json(response);
    return;
  }
  res.status(StatusCodes.OK).json(board);
};

const updateBoard: Controller = async (req, res) => {
  const payload = req.body;
  const userId = req.user?.userId;
  await Board.findOneAndUpdate({ createdBy: userId }, payload, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "updated successfully" });
};

export { getBoard, updateBoard };
