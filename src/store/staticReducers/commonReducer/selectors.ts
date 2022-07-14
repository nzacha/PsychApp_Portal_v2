import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../config";
import { IState } from "./reducer";

export const useSelectSnackBarData = (): IState['snackbar'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.COMMON_REDUCER] as IState).snackbar,
    shallowEqual
  );
};
  
export const useSelectStackedSnackBarData = (): IState['stackedSnackbar'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.COMMON_REDUCER] as IState).stackedSnackbar,
    shallowEqual
  );
};
  
  
export const useSelectSideBarConfig = (): IState['sideBar'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.COMMON_REDUCER] as IState).sideBar,
    shallowEqual
  );
};


export const useSelectNavBarConfig = (): IState['navBar'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.COMMON_REDUCER] as IState).navBar,
    shallowEqual
  );
};
  
