import { ActionStatus, IAction } from '../../../redux/common/actions';
import { defaultReducer, IReducerFunction } from '../../../redux/common/reducer';
import { IQuizData } from '../../../models/Quiz';
import * as Types from './types';

export interface IState {
  quizList: {
    status: ActionStatus | null;
    data: IQuizData[] | null; 
  };
  quizDetail: {
    status: ActionStatus | null;
    data: IQuizData | null; 
  };
}

const initialState: IState = {
  quizList: {
      status: null,
      data: null,
  },
  quizDetail: {
    status: null,
    data: null,
  },
};

const quizEditorReducer = (
  state: IState = initialState,
  action: IAction
): IState => {
    return defaultReducer(state, action, [
      {actionType: Types.SET_QUIZ_LIST, label: 'quizList', reducerFunctionType: IReducerFunction.Default},
      {actionType: Types.SET_QUIZ_DETAIL, label: 'quizDetail', reducerFunctionType: IReducerFunction.Default},
    ]);
};

export default quizEditorReducer;
