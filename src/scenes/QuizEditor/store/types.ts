import { typeCreator } from "../../../redux/common/types";
import { ReducerKeys } from "../../../redux/config";

export const SET_QUIZ_LIST: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'SetQuizList'
);

export const SET_QUIZ_DETAIL: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'SetQuizDetail'
);

export const UPDATE_QUIZ_DETAIL: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'UpdateQuizDetail'
);

export const INSERT_QUIZ_QUESTION: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'InsertQuizQuestion'
);

export const UPDATE_QUIZ_QUESTION: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'UpdateQuizQuestion'
);

export const DELETE_QUIZ_QUESTION: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'DeleteQuizQuestion'
);

export const INSERT_QUIZ_SECTION: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'InsertQuizSection'
);

export const UPDATE_QUIZ_SECTION: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'UpdateQuizSection'
);

export const DELETE_QUIZ_SECTION: string = typeCreator(
    ReducerKeys.QUIZ_EDITOR_REDUCER,
    'DeleteQuizSection'
);
