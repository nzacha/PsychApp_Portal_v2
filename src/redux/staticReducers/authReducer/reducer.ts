import { Dispatch } from "react"
import { IUserData } from "../../../models/Users"
import { ActionStatus } from "../../common/actions"
import { defaultReducer, IReducerFunction } from "../../common/reducer"
import { LOG_IN } from "./types"

export interface IState{
  logged_in_user: {
    data: IUserData | null,
    status: ActionStatus | null;
  }
}
const initialValue: IState = {
  logged_in_user: {
    data: null,
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
      override: false,
      reducerFunctionType: IReducerFunction.Default, 
    }
  ]);
}
  
export default authReducer
  