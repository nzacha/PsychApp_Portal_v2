import { typeCreator } from "../../../store/common/types";
import { ReducerKeys } from "../../../store/config";

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