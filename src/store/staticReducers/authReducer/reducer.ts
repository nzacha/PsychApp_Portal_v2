import { Dispatch } from "react"
import { IAlertData } from "../../../models/Alert"
import { IUserData } from "../../../models/Users"
import { ActionStatus } from "../../common/actions"
import { defaultReducer, IReducerFunction } from "../../common/reducer"
import { LOG_IN, SET_NOTIFICATION_DATA, UPDATE_NOTIFICATION_DETAIL } from "./types"

export interface IState{
  logged_in_user: {
    data: IUserData | null,
    status: ActionStatus | null;
  },
  notifications: {
    data: IAlertData[] | null,
    status: ActionStatus | null,
  }
}
const initialValue: IState = {
  logged_in_user: {
    data: null,
    status: null
  },
  notifications: {
    data: [],
    status: null
  }
}

export function setToken(token?: string | null, onFinish?: (value: string | null) => void) {
  if(token) localStorage.setItem('token', JSON.stringify(token));
  else localStorage.removeItem('token')
  if(onFinish) onFinish(token || null);
}

export function getToken(): string | null{
  const token = localStorage.getItem('token');
  if(token) return JSON.parse(token);
  else return null;
}

const authReducer = (state: IState = initialValue, action: any) => {
  return defaultReducer(state, action, [
    {
      actionType: LOG_IN, 
      label: 'logged_in_user', 
      reducerFunctionType: IReducerFunction.Default, 
    },
    {
      actionType: SET_NOTIFICATION_DATA, 
      label: 'notifications', 
      reducerFunctionType: IReducerFunction.Default, 
    },
    {
      actionType: UPDATE_NOTIFICATION_DETAIL, 
      label: 'notifications', 
      reducerFunctionType: IReducerFunction.Custom,
      reducerFunction: (state, action) => {
        if(action.status == ActionStatus.Success){
          const foundIndex = state.data.findIndex((el: IAlertData) => el.alert_id == action.data.alert_id);
          if(foundIndex != undefined){
            state.data[foundIndex] = action.data;
          }
          return state;
        }else{
          return state;
        }
      } 
    }
  ]);
}
  
export default authReducer
  