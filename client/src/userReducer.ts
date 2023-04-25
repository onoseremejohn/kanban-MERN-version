import {
  UserReducerType,
  UserStateType,
  UserActionType,
  UserTokenType,
} from "./types";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from "./actions";
import { initialState } from "./UserContext";

const reducer: UserReducerType<UserStateType, UserActionType> = (
  state: UserStateType,
  action: UserActionType
) => {
  switch (action.type) {
    case DISPLAY_ALERT: {
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please complete complete the fields",
      };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
        isLoading: false,
      };
    }
    case SETUP_USER_BEGIN: {
      return { ...state, isLoading: true };
    }
    case SETUP_USER_SUCCESS: {
      const { user, alertText, endPoint } = action.payload as {
        user: UserTokenType | null;
        alertText: string;
        endPoint?: "login" | "register";
      };
      return {
        ...state,
        isLoading: false,
        user,
        showAlert: true,
        alertText,
        alertType: "success",
        signupSuccess: endPoint === "register",
      };
    }
    case SETUP_USER_ERROR: {
      const { msg } = action.payload as { msg: string };
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: msg,
      };
    }
    case LOGOUT_USER: {
      return { ...initialState, user: null };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
