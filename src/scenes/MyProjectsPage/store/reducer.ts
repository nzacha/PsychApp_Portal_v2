import _ from 'lodash';
import { IProjectData } from '../../../models/Project';
import { ActionStatus, IAction } from '../../../redux/common/actions';
import { defaultReducer, IReducerFunction } from '../../../redux/common/reducer';
import * as Types from './types';

export interface IState {
  projectList: {
    status: ActionStatus | null;
    data: IProjectData[] | null; 
  };
  selectedProject: number | null;
}

const initialState: IState = {
    projectList: {
        status: null,
        data: null,
    },
    selectedProject: null
};

const ProjectManagerReducer = (
  state: IState = initialState,
  action: IAction
): IState => {
    return defaultReducer(state, action, [
      {actionType: Types.SET_PROJECT_LIST, label: 'projectList', reducerFunctionType: IReducerFunction.Default},
      {actionType: Types.SET_SELECTED_PROJECT, label: 'selectedProject', reducerFunctionType: IReducerFunction.Custom, 
        reducerFunction: (state, action) => {
          return action.data; 
        }
      }
    ])
};

export default ProjectManagerReducer;
