import { typeCreator } from "../../common/types";
import { ReducerKeys } from "../../config";

export const SET_SNACKBAR_DATA: string = typeCreator(
    ReducerKeys.COMMON_REDUCER,
    'SetSnackbarData'
);

export const SET_STACKED_SNACKBAR_DATA: string = typeCreator(
    ReducerKeys.COMMON_REDUCER,
    'SetStackedSnackbarData'
);

export const SET_SIDEBAR_CONFIG: string = typeCreator(
    ReducerKeys.COMMON_REDUCER,
    'SetSideBarConfig'
);

export const SET_NAVBAR_CONFIG: string = typeCreator(
    ReducerKeys.COMMON_REDUCER,
    'SetNavBarConfig'
);