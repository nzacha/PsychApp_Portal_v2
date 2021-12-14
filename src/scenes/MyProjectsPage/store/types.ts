import { typeCreator } from "../../../redux/common/types";
import { ReducerKeys } from "../../../redux/config";

export const SET_PROJECT_LIST: string = typeCreator(
    ReducerKeys.MY_PROJECT_MANAGER_REDUCER,
    'SetProjectList'
);

export const SET_SELECTED_PROJECT: string = typeCreator(
    ReducerKeys.MY_PROJECT_MANAGER_REDUCER,
    'SetSelectProject'
);

export const UPDATE_PROJECT: string = typeCreator(
    ReducerKeys.MY_PROJECT_MANAGER_REDUCER,
    'UpdateProject'
);
