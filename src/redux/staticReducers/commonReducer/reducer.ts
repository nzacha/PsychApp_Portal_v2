import { ISnackBarOptions } from "../../../components/Snackbar";
import { IStackedSnackBarOptions } from "../../../providers/AppProvider";
import { ActionStatus, IAction } from "../../common/actions";
import { SET_SNACKBAR_DATA, SET_STACKED_SNACKBAR_DATA } from "./types";

export interface IState {
  snackbar: ISnackBarOptions;
  stackedSnackbar: Array<IStackedSnackBarOptions>;
}

const initialState: IState = {
  snackbar: {
    isOpen: false,
    message: undefined,
    severity: undefined,
    duration: undefined
  },
  stackedSnackbar: []
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
      default:
        return state
    }
  }
  
export default commonReducer
  