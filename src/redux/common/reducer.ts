import _ from "lodash";
import { ActionStatus, IAction } from "./actions";

export enum IReducerFunction{
  Default,
  StatusArray,
  Custom
}

export function defaultReducer<TState>(
    state: TState,
    action: IAction,
    types: Array<{
        label: string;
        actionType: string;
        reducerFunctionType: IReducerFunction;
        override?: boolean;
        reducerFunction?: (state: any, action:IAction) => any;
        onFinish?: (result: any) => void;
    }>,
    displayInConsole= false,
  ):TState {
      let type = types.find((el) => el.actionType === action.type);
      let stateChange:any = {};
      if(type){
        if(displayInConsole) console.log(action);
        
        stateChange = JSON.parse(JSON.stringify(_.get(state, type.label)));
        switch(type.reducerFunctionType){
          case IReducerFunction.StatusArray:
            stateChange.status = action.status;
            if(action.status === ActionStatus.Success){
              stateChange.id = action.data.id
            } 
            break;
            
          case IReducerFunction.Default:
              stateChange.status = action.status;
              stateChange.data = defaultActionResolver(action);
            break;
          
          case IReducerFunction.Custom:
            if(type?.reducerFunction) 
              stateChange = type.reducerFunction(stateChange, action);
            break;
        }
        _.set(state as any, type.label, stateChange);
        if(type?.onFinish && action.status == ActionStatus.Success) 
          type.onFinish(_.get(state, type.label));
        // console.log(state);
      }
      return {...state, stateChange};
}

function defaultActionResolver(action: IAction): IAction['data'] {
  switch(action.status){
      case ActionStatus.Pending:
          return action?.data || null;
      case ActionStatus.Success:
        return action?.data || null;
      case ActionStatus.Failure:
          return null;
  }
}
