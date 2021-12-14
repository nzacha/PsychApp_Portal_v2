import _ from 'lodash';
import { IProjectData } from '../../../models/Project';
import { IProjectUserLinkData } from '../../../models/ProjectUserLink';
import { ActionStatus, IAction } from '../../../redux/common/actions';
import { defaultReducer, IReducerFunction } from '../../../redux/common/reducer';
import * as Types from './types';

export interface IState {
  projectList: {
    status: ActionStatus | null;
    data: IProjectData[] | null; 
  };
  projectUserLinks: {
    status: ActionStatus | null;
    data: IProjectUserLinkData[] | null; 
  }
  updateProjectUserLinks: ActionStatus | null;
}

const initialState: IState = {
    projectList: {
        status: null,
        data: null,
    },
    projectUserLinks: {
        status: null,
        data: null,
    },
    updateProjectUserLinks: null,
};

const ProjectManagerReducer = (
  state: IState = initialState,
  action: IAction
): IState => {
    return defaultReducer(state, action, [
      {actionType: Types.SET_PROJECT_LIST, label: 'projectList', reducerFunctionType: IReducerFunction.Default},
      {actionType: Types.SET_PROJECT_USER_LINKS, label: 'projectUserLinks', reducerFunctionType: IReducerFunction.Default},
      {actionType: Types.UPDATE_PROJECT_USER_LINKS, label: 'updateProjectUserLinks', reducerFunctionType: IReducerFunction.Custom, 
        reducerFunction: (state, action) => {
          return action.status; 
        }
      },
    ])
};

export default ProjectManagerReducer;
