import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../../redux/config";
import { IState } from "./reducer";

export const useGetUserList = (): IState['userList'] => {
    return useSelector(
      (state: any) => (state[ReducerKeys.USER_MANAGER_REDUCER] as IState).userList,
      shallowEqual
    );
  };
  