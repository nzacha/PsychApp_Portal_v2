import _ from 'lodash';
import { IQuizAnswerData } from '../../../models/QuizAnswer';
import { ActionStatus, IAction } from '../../../store/common/actions';
import { defaultReducer, IReducerFunction } from '../../../store/common/reducer';
import * as Types from './types';

export interface IState {
  answerList: {
    status: ActionStatus | null;
    data: IQuizAnswerData[] | null; 
  }
}

const initialState: IState = {
    answerList: {
        status: null,
        data: null,
    },
};

const QueryPageReducer = (
  state: IState = initialState,
  action: IAction
): IState => {
    return defaultReducer(state, action, [
      {actionType: Types.SET_ANSWER_LIST, label: 'answerList', reducerFunctionType: IReducerFunction.Default},
    ])
};

export default QueryPageReducer;
