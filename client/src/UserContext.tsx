import { useContext, createContext, ReactNode, useReducer } from "react";
import axios from "axios";
import { UserStateType } from "./types";
import reducer from "./userReducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from "./actions";
const UserContext = createContext<UserStateType | null>(null);

function getLocalStorageToken(): UserStateType["user"] {
  const userToken = localStorage.getItem("kanban-userToken");
  return userToken ? JSON.parse(userToken) : null;
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("kanban-userToken");
};
const addUserToLocalStorage = (userToken: UserStateType["user"]) => {
  localStorage.setItem("kanban-userToken", JSON.stringify(userToken));
};

const initialState: UserStateType = {
  user: getLocalStorageToken(),
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  signupSuccess: false,
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const setupUser: UserStateType["setupUser"] = async ({
    currentUser,
    endPoint,
    alertText,
  }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/auth/${endPoint}`, currentUser);
      if (endPoint === "register") {
        dispatch({
          type: SETUP_USER_SUCCESS,
          payload: { user: null, alertText, endPoint },
        });
        clearAlert();
        return;
      }
      const { user, token } = data as unknown as {
        user: { name: string };
        token: string;
      };
      const userToken = { name: user.name, token };
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user: userToken, alertText },
      });
      addUserToLocalStorage(userToken);
    } catch (error: any) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data?.msg || "Error" },
      });
    }
    clearAlert();
  };
  const authFetch = axios.create({
    baseURL: "/api",
  });
  authFetch.interceptors.request.use(
    (request) => {
      if (state.user && state.user.token) {
        request.headers.Authorization = `Bearer ${state.user.token}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const logoutUser = () => {
    removeUserFromLocalStorage();
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        authFetch,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): UserStateType | null => useContext(UserContext);

export { useUserContext, UserProvider, initialState };
