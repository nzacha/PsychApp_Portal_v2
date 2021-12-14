import { useSelector, shallowEqual} from "react-redux";
import { IProjectData } from "../../../models/Project";
import { ReducerKeys } from "../../../redux/config";
import { IState } from "./reducer";

export const useGetProjectList = (): IState['projectList'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.MY_PROJECT_MANAGER_REDUCER] as IState).projectList,
    shallowEqual
  );
};

export const useGetSelectedProject = (): IState['selectedProject'] => {
  return useSelector(
    (state: any) => (state[ReducerKeys.MY_PROJECT_MANAGER_REDUCER] as IState).selectedProject,
    shallowEqual
  );
};

export const useGetSelectedProjectData = (index: number): IProjectData | null => {
  return useSelector(
    (state: any) => ((state[ReducerKeys.MY_PROJECT_MANAGER_REDUCER] as IState)?.projectList?.data || [])[index],
    shallowEqual
  );
};
  