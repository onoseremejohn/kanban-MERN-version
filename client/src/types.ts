import { ChangeEvent } from "react";
import { AxiosInstance } from "axios";
export interface StorageType {
  theme: "dark" | "light";
  boards: BoardType[];
  currentBoardId: string;
}

export interface ViewTaskPayload {
  columnId: string;
  taskId: string;
}
export interface ToggleSubtaskPayload {
  e: ChangeEvent<HTMLInputElement>;
  id: string;
}
export interface EditTaskPayload {
  task: TasksType;
  val: Boolean;
}

export interface SameColumnReorderPayload {
  taskId: string;
  columnId: string;
  destinationIndex: number;
}
export interface DiffColumnReorderPayload {
  taskId: string;
  sourceColId: string;
  destColId: string;
  destinationIndex: number;
}
export interface reOrderColumnsPayload {
  colId: string;
  destinationIndex: number;
}

export interface ActionType {
  type: string;
  payload?:
    | StorageType
    | ViewTaskPayload
    | string
    | ToggleSubtaskPayload
    | EditTaskPayload
    | BoardType
    | SameColumnReorderPayload
    | DiffColumnReorderPayload
    | reOrderColumnsPayload;
}

export interface StateType {
  theme: "light" | "dark";
  boards: BoardType[];
  boardIds: string[];
  currentBoardId: string;
  showBoardMenu: boolean;
  viewTaskModal: boolean;
  modifyTask: boolean;
  editDeleteMenu: boolean;
  deleteWarning: boolean;
  editOrAddNewBoardModal: boolean;
  editBoardFlag: boolean;
  addNewColumnFlag: boolean;
  sidebarOpen: boolean;
  selectedTask: {
    task?: TasksType | null;
    statusIds?: string[];
    columnId: string;
  };
  openBoardMenu?(): void;
  closeModal?(): void;
  selectBoard?(a: string): void;
  openTask?(a: string, b: string): void;
  toggleSubtask?(a: ChangeEvent<HTMLInputElement>, b: string): void;
  changeStatus?(a: string): void;
  modify?(a?: "delete"): void;
  editTask?(a: TasksType, b: Boolean): void;
  deleteTask?(a: string): void;
  editDeleteToggle?(): void;
  deleteBoard?(a?: string): void;
  openAddNewOrEditBoard?(a: "add" | "edit" | "column"): void;
  addNewBoard?(a: BoardType): void;
  editBoard?(a: BoardType): void;
  toggleTheme?(): void;
  sidebar?(a: "open" | "close"): void;
  sameColumnReorder?(a: string, b: string, c: number): void;
  diffColumnReorder?(a: string, b: string, c: string, d: number): void;
  reOrderColumns?(a: string, b: number): void;
  isLoading: boolean;
  tasksLoaded: boolean;
  hasUnsavedChanges: boolean;
  isError: boolean;
}

export type ReducerType<S, A> = (state: S, action: A) => StateType;

export interface TasksType {
  id: string;
  title: string;
  description: string;
  status: string;
  statusId: string;
  subtasks: { title: string; isCompleted: boolean; id: string }[];
  createdOn: Date | string;
  due: Date | string;
  assignedTo: { id: string; name: string; email: string }[];
}

export interface ColumnType {
  id: string;
  name: string;
  color: string;
  tasks: TasksType[];
}

export interface BoardType {
  id: string;
  name: string;
  columns: ColumnType[];
}

export interface UserStateType {
  user: null | UserTokenType;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  signupSuccess: boolean;
  alertType: "danger" | "success" | "";
  displayAlert?(): void;
  clearAlert?(): void;
  setupUser?(a: setupUserPayload): void;
  authFetch?: AxiosInstance;
  logoutUser?(): void;
}

export type UserReducerType<S, A> = (state: S, action: A) => UserStateType;

export interface UserActionType {
  type: string;
  payload?:
    | { msg: string }
    | {
        user: UserTokenType | null;
        alertText: string;
        endPoint?: "login" | "register";
      };
}

export interface UserTokenType {
  name: string;
  token: string;
}

interface setupUserPayload {
  currentUser: { name: string; email: string; password: string };
  endPoint: "login" | "register";
  alertText: string;
}
