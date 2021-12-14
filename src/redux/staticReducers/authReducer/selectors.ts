import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../../redux/config";
import { IState } from "./reducer";

export const useSelectAuthData = (): IState['logged_in_user'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.AUTH_REDUCER] as IState).logged_in_user,
    shallowEqual
  );
};
  
  