import mongoose, { Schema, model } from "mongoose";
import moment from "moment";
import { Assignee } from "../types.js";
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

const assignedToSchema = new Schema({
  id: {
    type: String,
    required: [true, "assignee must have an id"],
  },
  name: {
    type: String,
    required: [true, "assignee must have a name"],
  },
  email: {
    type: String,
    required: [true, "assignee must have an email"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
    lowercase: true,
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
  createdOn: {
    type: Date,
    required: [true, "task must have a createdOn date"],
    default: moment().toDate(),
  },
  due: {
    type: Date,
    required: [true, "task must have a due date"],
    default: () => moment().add(5, "days").toDate(),
  },
  status: {
    type: String,
    required: [true, "task must have a status"],
    maxlength: 50,
  },
  subtasks: [subtaskSchema],
  assignedTo: {
    type: [assignedToSchema],
    default: [],
    validate: {
      validator: (val: Assignee[]) => {
        const emails = val.map((assignee) => assignee.email);
        return new Set(emails).size === emails.length;
      },
      message: "Assignees emails must be unique",
    },
  },
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

const appSchema = new Schema({
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
});

export default model("Board", appSchema);
