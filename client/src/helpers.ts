import { TasksType, BoardType, ColumnType } from "./types";
export const countCompletedSubtasks = (subtasks: TasksType["subtasks"]) => {
  const completed = subtasks.filter((x) => x.isCompleted);
  return completed.length;
};

interface FindBoard {
  (a: BoardType[] | undefined, b: string | undefined): string | undefined;
}
interface StatusName {
  (a: BoardType[] | undefined, b: string | undefined, c: string | undefined):
    | string
    | undefined;
}
interface GetColumn {
  (a: BoardType[], b: string, c: string): ColumnType | undefined;
}

export const findBoard: FindBoard = (boards, id) => {
  const board = boards?.find((b) => b.id === id);
  return board?.name.toLowerCase();
};

export const statusName: StatusName = (boards, boardId, id) => {
  const board = boards?.find((b) => b.id === boardId);
  const col = board?.columns.find((c) => c.id === id);
  return col?.name;
};

export const getColumn: GetColumn = (boards, boardId, columnId) => {
  const board = boards.find((b) => b.id === boardId);
  const col = board?.columns.find((c) => c.id === columnId);
  return col;
};
