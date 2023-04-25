declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string;
    white: string;
    modalText: string;
    modifyToggle: string;
    headerText: string;
    borderLine: string;
    cancelColor: string;
    cancelBg: string;
  }
}
import {
  useContext,
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  ChangeEvent,
} from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reducer from "./reducer";
import { useUserContext } from "./UserContext";
// import { debounce } from "lodash";
import {
  LOAD,
  OPENBOARDMENU,
  CLOSEMODAL,
  SELECTBOARD,
  VIEWTASKMODAL,
  TOGGLESUBTASK,
  CHANGESTATUS,
  MODIFYTASKMODAL,
  EDITTASK,
  DELETETASKORBOARDMODAL,
  FILTERDELETETASK,
  EDITDELETEMENUTOGGLE,
  FILTERDELETEBOARD,
  OPENADDNEWBOARDMODAL,
  ADDNEWBOARD,
  OPENEDITBOARDMODAL,
  EDITBOARD,
  ADDNEWCOLUMNMODAL,
  TOGGLETHEME,
  SIDEBAR,
  SAMECOLUMNREORDER,
  DIFFCOLUMNREORDER,
  REORDERCOLUMNS,
  FETCHBOARDSTART,
  FETCHBOARDERROR,
} from "./actions";
import { StateType, TasksType, BoardType } from "./types";
const lightTheme = {
  body: "#f4f7fd;",
  text: "#363537",
  white: "#fff",
  modalText: "#828fa3",
  headerText: "#000",
  modifyToggle: "#fff",
  borderLine: "#e4ebfa",
  cancelColor: "#635fc7",
  cancelBg: "#fff",
};

const darkTheme = {
  body: "#20212c",
  text: "#FAFAFA",
  white: "#2b2c37",
  modalText: "#fff",
  headerText: "#fff",
  modifyToggle: "#20212c",
  borderLine: "#3e3f4e",
  cancelColor: "#fff",
  cancelBg: "transparent",
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
`;

function getTheme() {
  const theme = localStorage.getItem("theme");
  return theme === "light" || theme === "dark" ? theme : "light";
}

const initialState: StateType = {
  theme: getTheme(),
  boards: [],
  showBoardMenu: false,
  viewTaskModal: false,
  modifyTask: false,
  editDeleteMenu: false,
  boardIds: [],
  currentBoardId: "",
  selectedTask: { task: null, statusIds: [], columnId: "" },
  deleteWarning: false,
  editOrAddNewBoardModal: false,
  editBoardFlag: false,
  addNewColumnFlag: false,
  sidebarOpen: false,
  isLoading: true,
  isError: false,
  tasksLoaded: false,
  hasUnsavedChanges: false,
};

const AppContext = createContext<StateType | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { authFetch, user } = useUserContext() || {};
  const [state, dispatch] = useReducer(reducer, initialState);
  const isLight = state.theme === "light";

  useEffect(() => {
    if (!authFetch || !user) return;
    const getTasks = async () => {
      dispatch({ type: FETCHBOARDSTART });
      try {
        const { data } = await authFetch("/tasks");
        dispatch({
          type: LOAD,
          payload: {
            boards: data.boards,
            theme: data.theme,
            currentBoardId: data.currentBoardId,
          },
        });
        localStorage.setItem("theme", data.theme);
      } catch (error) {
        // do something
        dispatch({ type: FETCHBOARDERROR });
      }
    };

    getTasks();
  }, [user]);
  useEffect(() => {
    if (!authFetch || !user || !state.tasksLoaded || !state.hasUnsavedChanges)
      return;
    let timeoutId: NodeJS.Timeout;
    const MAX_RETRIES = 3;
    let retries = 0;
    const saveChanges = async function () {
      const update = {
        theme: state.theme,
        boards: state.boards,
        currentBoardId: state.currentBoardId,
      };
      try {
        await authFetch.patch("/tasks", update);
        localStorage.setItem("theme", update.theme);
      } catch (error) {
        console.log(error);
        if (retries < MAX_RETRIES) {
          retries++;
          console.log(`Retring to save changes. Retry count : ${retries}`);
          timeoutId = setTimeout(saveChanges, 1500 * retries); // exponential backoff strategy
        } else {
          console.log("Max retries reached. Aborting patch request");
        }
      }
    };
    saveChanges();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    state.tasksLoaded,
    state.hasUnsavedChanges,
    state.theme,
    state.boards,
    state.currentBoardId,
  ]);
  const openBoardMenu = () => dispatch({ type: OPENBOARDMENU });
  const closeModal = () => dispatch({ type: CLOSEMODAL });
  const selectBoard = (id: string) => {
    if (id === state.currentBoardId) return;
    dispatch({ type: SELECTBOARD, payload: id });
  };
  const openTask = (columnId: string, taskId: string) =>
    dispatch({ type: VIEWTASKMODAL, payload: { columnId, taskId } });
  const toggleSubtask = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    dispatch({ type: TOGGLESUBTASK, payload: { e, id } });
  };
  const changeStatus = (id: string) => {
    dispatch({ type: CHANGESTATUS, payload: id });
  };
  const modify = (a?: "delete") => {
    if (!a) dispatch({ type: MODIFYTASKMODAL });
    else dispatch({ type: DELETETASKORBOARDMODAL });
  };
  const editTask = (task: TasksType, val: Boolean) =>
    dispatch({ type: EDITTASK, payload: { task, val } });
  const deleteTask = (id: string) =>
    dispatch({ type: FILTERDELETETASK, payload: id });
  const editDeleteToggle = () => dispatch({ type: EDITDELETEMENUTOGGLE });
  const deleteBoard = (id?: string) =>
    dispatch({ type: FILTERDELETEBOARD, payload: id });
  const openAddNewOrEditBoard = (a: "add" | "edit" | "column") => {
    if (a === "add") dispatch({ type: OPENADDNEWBOARDMODAL });
    if (a === "edit") dispatch({ type: OPENEDITBOARDMODAL });
    if (a === "column") dispatch({ type: ADDNEWCOLUMNMODAL });
  };
  const addNewBoard = (board: BoardType) =>
    dispatch({ type: ADDNEWBOARD, payload: board });
  const editBoard = (board: BoardType) =>
    dispatch({ type: EDITBOARD, payload: board });
  const toggleTheme = () => dispatch({ type: TOGGLETHEME });
  const sidebar = (val: "open" | "close") =>
    dispatch({ type: SIDEBAR, payload: val });

  const sameColumnReorder = (
    taskId: string,
    columnId: string,
    destinationIndex: number
  ) =>
    dispatch({
      type: SAMECOLUMNREORDER,
      payload: { taskId, columnId, destinationIndex },
    });

  const diffColumnReorder = (
    taskId: string,
    sourceColId: string,
    destColId: string,
    destinationIndex: number
  ) =>
    dispatch({
      type: DIFFCOLUMNREORDER,
      payload: { taskId, sourceColId, destColId, destinationIndex },
    });

  const reOrderColumns = (colId: string, destinationIndex: number) =>
    dispatch({
      type: REORDERCOLUMNS,
      payload: { colId, destinationIndex },
    });

  return (
    <AppContext.Provider
      value={{
        ...state,
        openBoardMenu,
        closeModal,
        selectBoard,
        openTask,
        toggleSubtask,
        changeStatus,
        modify,
        editTask,
        deleteTask,
        editDeleteToggle,
        deleteBoard,
        addNewBoard,
        openAddNewOrEditBoard,
        editBoard,
        toggleTheme,
        sidebar,
        sameColumnReorder,
        diffColumnReorder,
        reOrderColumns,
      }}
    >
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const useGlobalContext = (): StateType | null => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
