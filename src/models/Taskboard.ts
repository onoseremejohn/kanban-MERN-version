import mongoose, { Schema, model } from "mongoose";

const subtaskSchema = new Schema({
  id: {
    type: String,
    required: [true, "Subtask must have an id"],
  },
  title: {
    type: String,
    required: [true, "Subtask must have a title"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new Schema({
  id: {
    type: String,
    required: [true, "task must have an id"],
  },
  title: {
    type: String,
    required: [true, "task must have a title"],
    maxlength: 200,
  },
  description: {
    type: String,
    maxlength: 350,
  },
  statusId: {
    type: String,
    required: [true, "task must have a statusId"],
  },
  status: {
    type: String,
    required: [true, "task must have a status"],
    maxlength: 50,
  },
  subtasks: [subtaskSchema],
});

const columnSchema = new Schema({
  id: {
    type: String,
    required: [true, "column must have an id"],
  },
  name: {
    type: String,
    required: [true, "column must have a name"],
    maxlength: 50,
  },
  color: String,
  tasks: [taskSchema],
});

const boardSchema = new Schema({
  id: {
    type: String,
    required: [true, "board must have an id"],
  },
  name: {
    type: String,
    required: [true, "board must have a name"],
    maxlength: 50,
  },
  columns: [columnSchema],
});

const appSchema = new Schema(
  {
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    boards: [boardSchema],
    boardIds: {
      type: [String],
    },
    currentBoardId: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },

  { timestamps: true }
);

export default model("Board", appSchema);
