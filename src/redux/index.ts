import { combineReducers } from 'redux'
import { ReducerKeys } from './config'
import authReducer from './staticReducers/authReducer/reducer'
import commonReducer from './staticReducers/commonReducer/reducer'
import projectManagerReducer from '../scenes/ProjectManager/store/reducer'
import myProjectsManagerReducer from '../scenes/MyProjectsPage/store/reducer'
import userManagerReducer from '../scenes/UserManager/store/reducer'
import participationManagerReducer from '../scenes/ParticipantManager/store/reducer'
import quizEditorReducer from '../scenes/QuizEditor/store/reducer'
import queryPageReducer from '../scenes/QuerySelector/store/reducer'

export default combineReducers({
    [ReducerKeys.AUTH_REDUCER]: authReducer,
    [ReducerKeys.COMMON_REDUCER]: commonReducer,
    [ReducerKeys.QUERY_PAGE_REDUCER]: queryPageReducer,
    [ReducerKeys.PROJECTS_MANAGER_REDUCER]: projectManagerReducer,
    [ReducerKeys.MY_PROJECT_MANAGER_REDUCER]: myProjectsManagerReducer,
    [ReducerKeys.USER_MANAGER_REDUCER]: userManagerReducer,
    [ReducerKeys.QUIZ_EDITOR_REDUCER]: quizEditorReducer,
    [ReducerKeys.PARTICIPANT_MANAGER_REDUCER]: participationManagerReducer,
})
