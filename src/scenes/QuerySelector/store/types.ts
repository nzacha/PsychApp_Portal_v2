import { typeCreator } from "../../../redux/common/types";
import { ReducerKeys } from "../../../redux/config";

export const SET_ANSWER_LIST: string = typeCreator(
    ReducerKeys.QUERY_PAGE_REDUCER,
    'SetAnswerList'
);
