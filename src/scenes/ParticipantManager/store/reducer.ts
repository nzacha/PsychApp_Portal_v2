import { IProjectParticipantData } from '../../../models/ProjectParticipant';
import { ActionStatus, IAction } from '../../../redux/common/actions';
import { defaultReducer, IReducerFunction } from '../../../redux/common/reducer';
import * as Types from './types';

export interface IState {
  participantList: {
    status: ActionStatus | null;
    data: IProjectParticipantData[] | null; 
  };
}

const initialState: IState = {
  participantList: {
        status: null,
        data: null,
    },
};

const UserManagerReducer = (
  state: IState = initialState,
  action: IAction
): IState => {
    return defaultReducer(state, action, [
      {actionType: Types.SET_PARTICIPANT_LIST, label: 'participantList', reducerFunctionType: IReducerFunction.Default}
    ]);
};

export default UserManagerReducer;
