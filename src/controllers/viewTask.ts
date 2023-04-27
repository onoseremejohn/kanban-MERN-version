import { Controller } from "../types.js";
import { StatusCodes } from "http-status-codes";
import Board from "../models/Taskboard.js";
import NotFoundError from "../errors/not-found.js";
import { Main, TasksType } from "../utils.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

const viewTask: Controller = async (req, res) => {
  const { userId, taskId } = req.params;
  let { email } = req.query as { email: string | undefined };
  email = email ? email.toLowerCase() : "";
  const board = (await Board.findOne({ createdBy: userId })) as Main;
  if (!board) throw new NotFoundError("Sorry we cannot find the Task");
  const data = board.boards
    .flatMap((board) =>
      board.columns.flatMap((column) =>
        column.tasks.find((task) => task.id === taskId)
      )
    )
    .filter((task) => task != null)
    .filter((task): task is TasksType => task != undefined);
  const firstTask = data[0];
  if (!firstTask) throw new NotFoundError("Sorry we cannot find the Task");
  const isAssignee = firstTask.assignedTo?.some(
    (a) => a.email.toLowerCase() === email
  );
  if (!isAssignee)
    throw new UnauthenticatedError(
      "You dont have permission to view this task"
    );

  res.status(StatusCodes.OK).render("task", { task: firstTask });
  // res.status(StatusCodes.OK).json({ task: firstTask });
};

export default viewTask;
