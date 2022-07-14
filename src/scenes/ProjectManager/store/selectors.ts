import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../../store/config";
import { IState } from "./reducer";

export const useGetProjectList = (): IState['projectList'] => {
  return useSelector(
      (state: any) => (state[ReducerKeys.PROJECTS_MANAGER_REDUCER] as IState).projectList,
      shallowEqual
    );
};

export const useGetProjectUserLinks = (): IState['projectUserLinks'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.PROJECTS_MANAGER_REDUCER] as IState).projectUserLinks,
    shallowEqual
  );
};

