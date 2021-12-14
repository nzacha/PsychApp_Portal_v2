import { typeCreator } from "../../../redux/common/types";
import { ReducerKeys } from "../../../redux/config";

export const SET_PROJECT_LIST: string = typeCreator(
    ReducerKeys.PROJECTS_MANAGER_REDUCER,
    'SetProjectList'
);

export const SET_PROJECT_USER_LINKS: string = typeCreator(
    ReducerKeys.PROJECTS_MANAGER_REDUCER,
    'SetProjectUserLinks'
);

export const UPDATE_PROJECT_USER_LINKS: string = typeCreator(
    ReducerKeys.PROJECTS_MANAGER_REDUCER,
    'UpdateProjectUserLinks'
);