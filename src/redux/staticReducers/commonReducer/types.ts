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
