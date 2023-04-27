import { TasksType, BoardType, ColumnType } from "./types";
export const countCompletedSubtasks = (subtasks: TasksType["subtasks"]) => {
  const completed = subtasks.filter((x) => x.isCompleted);
  return completed.length;
};

export const isCompleted = (subtasks: TasksType["subtasks"]) => {
  if (subtasks.length === 0) return false;
  if (countCompletedSubtasks(subtasks) < subtasks.length) return false;
  return true;
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

export function getInitials(name: string) {
  const names = name
    .trim()
    .split(" ")
    .filter((x) => x !== "");
  let initials = "";
  for (let i = 0; i < names.length; i++) {
    const firstChar = names[i].charAt(0).toUpperCase();
    initials += firstChar;
    if (i == 1) {
      break;
    }
  }
  return initials;
}

export function capitalizeName(name: string) {
  const firstName = name.trim().split(" ")[0];
  const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  return capitalized;
}

export function capitalizeSentence(sentence: string) {
  const words = sentence.split(" ");
  const capitalized = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const result = capitalized.join(" ");
  return result;
}




