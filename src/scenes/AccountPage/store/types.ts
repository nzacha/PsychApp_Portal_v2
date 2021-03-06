import { typeCreator } from "../../../store/common/types";
import { ReducerKeys } from "../../../store/config";

export const SET_USER_LIST: string = typeCreator(
    ReducerKeys.USER_MANAGER_REDUCER,
    'SetUserList'
);

export const INSERT_USER: string = typeCreator(
    ReducerKeys.USER_MANAGER_REDUCER,
    'InsertUser'
);

export const UPDATE_USER: string = typeCreator(
    ReducerKeys.USER_MANAGER_REDUCER,
    'UpdateUser'
);

export const DELETE_USER: string = typeCreator(
    ReducerKeys.USER_MANAGER_REDUCER,
    'DeleteUser'
);
