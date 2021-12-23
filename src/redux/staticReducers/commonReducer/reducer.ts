import { ISnackBarOptions } from "../../../components/Snackbar";
import { IStackedSnackBarOptions } from "../../../providers/AppProvider";
import { ActionStatus, IAction } from "../../common/actions";
import { defaultReducer, IReducerFunction } from "../../common/reducer";
import { SET_NAVBAR_CONFIG, SET_SIDEBAR_CONFIG, SET_SNACKBAR_DATA, SET_STACKED_SNACKBAR_DATA } from "./types";

export interface IState {
  snackbar: ISnackBarOptions;
  stackedSnackbar: Array<IStackedSnackBarOptions>;
  sideBar: {
    hideOnClose: boolean;
  },
  navBar:{
    isStatic: boolean;
  }
}

const initialState: IState = {
  snackbar: {
    isOpen: false,
    message: undefined,
    severity: undefined,
    duration: undefined
  },
  stackedSnackbar: [],
  sideBar: {
    hideOnClose: false,
  },
  navBar: {
    isStatic: false
  } 
};

const commonReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
      case SET_SNACKBAR_DATA: 
        return {
          ...state,
          snackbar: {
            ...state.snackbar, 
            ...action.data
          }
        }
      case SET_STACKED_SNACKBAR_DATA: 
        const newStackedSnackbar = state.stackedSnackbar.slice();
        // eslint-disable-next-line eqeqeq
        if(action.status == ActionStatus.Success) {
          newStackedSnackbar.push(action.data);
        }
        return {
          ...state,
          stackedSnackbar: newStackedSnackbar
        }
      case SET_SIDEBAR_CONFIG:
        return defaultReducer(state, action, [
          {actionType: SET_SIDEBAR_CONFIG, label: 'sideBar', reducerFunctionType: IReducerFunction.Custom, 
          reducerFunction: (state, action) => {
            state = action.data;
          }}
        ])
      case SET_NAVBAR_CONFIG:
        return defaultReducer(state, action, [
          {actionType: SET_NAVBAR_CONFIG, label: 'navBar', reducerFunctionType: IReducerFunction.Custom, 
          reducerFunction: (state, action) => {
            state = action.data;
          }}
        ])
      default:
        return state
    }
  }
  
export default commonReducer
  