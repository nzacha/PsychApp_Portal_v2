import { typeCreator } from "../../common/types";
import { ReducerKeys } from "../../config";

export const LOG_IN: string = typeCreator(
    ReducerKeys.AUTH_REDUCER,
    'AuthLogIn'
);

export const SET_NOTIFICATION_DATA: string = typeCreator(
    ReducerKeys.AUTH_REDUCER,
    'SetNotificationData'
);

export const UPDATE_NOTIFICATION_DETAIL: string = typeCreator(
    ReducerKeys.AUTH_REDUCER,
    'UpdateNotificationDetail'
);
