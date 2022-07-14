import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../config";
import { IState } from "./reducer";

export const useSelectAuthData = (): IState['logged_in_user'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.AUTH_REDUCER] as IState).logged_in_user,
    shallowEqual
  );
};
  
export const useSelectNotificationData = (): IState['notifications'] => {
  return useSelector(
    (state: any) => ((state[ReducerKeys.AUTH_REDUCER] as IState).notifications),
    shallowEqual
  );
};