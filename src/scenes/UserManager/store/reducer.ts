import { ActionStatus, IAction } from '../../../store/common/actions';
import { defaultReducer, IReducerFunction } from '../../../store/common/reducer';
import * as Types from './types';

export interface IState {
  userList: {
    status: ActionStatus | null;
    data: any | null; 
  };
}

const initialState: IState = {
    userList: {
        status: null,
        data: null,
    },
};

const UserManagerReducer = (
  state: IState = initialState,
  action: IAction
): IState => {
    return defaultReducer(state, action, [
      {actionType: Types.SET_USER_LIST, label: 'userList', reducerFunctionType: IReducerFunction.Default}
    ]);
};

export default UserManagerReducer;
