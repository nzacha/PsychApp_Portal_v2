import { typeCreator } from "../../../store/common/types";
import { ReducerKeys } from "../../../store/config";

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
