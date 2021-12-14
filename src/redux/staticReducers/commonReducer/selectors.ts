import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../../redux/config";
import { IState } from "./reducer";

export const useSelectSnackBarData = (): IState['snackbar'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.COMMON_REDUCER] as IState).snackbar,
    shallowEqual
  );
};
  
export const useSelectStackedSnackbarData = (): IState['stackedSnackbar'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.COMMON_REDUCER] as IState).stackedSnackbar,
    shallowEqual
  );
};
  