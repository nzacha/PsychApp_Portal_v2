import { typeCreator } from "../../../store/common/types";
import { ReducerKeys } from "../../../store/config";

export const SET_ANSWER_LIST: string = typeCreator(
    ReducerKeys.QUERY_PAGE_REDUCER,
    'SetAnswerList'
);
