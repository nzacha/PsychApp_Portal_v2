import { typeCreator } from "../../common/types";
import { ReducerKeys } from "../../config";

export const LOG_IN: string = typeCreator(
    ReducerKeys.AUTH_REDUCER,
    'AuthLogIn'
);

