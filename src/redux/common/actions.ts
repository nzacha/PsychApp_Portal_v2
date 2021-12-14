import { Method, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { showStackedSnackBar } from "../../providers/AppProvider";
import { HttpMethod } from "../../config/httpMethods";
import { request } from "../../config/request";
import { SUCCESS } from "../../config/response";

export enum ActionStatus{
    Pending = 'pending',
    Success = 'success',
    Failure = 'failure'
}

export interface IAction{
    type: string;
    status: ActionStatus;
    data: any;
}

interface IDefaultAPIActionProps{
    method: HttpMethod;
    path: string;
    body?: {};
    next?: (response: AxiosResponse) => void;
    onFinish?: (success: boolean, result?: any) => any;
    displayInSnackbar?: boolean;
    displayInConsole?: boolean;
}

export const defaultAPIAction = ({displayInSnackbar = true, displayInConsole = false, ...props}: IDefaultAPIActionProps) => {
    return async (dispatch: Dispatch<any>, type: string) => {
        try{
            dispatch({
                type: type,
                status: ActionStatus.Pending,
                data: null
            });
            const res = await request({path: props.path, method: props.method as Method, body: props.body, next: props.next});
            dispatch({
                type: type,
                status: res.status,
                data: res.data?.response
            });
            if(props.onFinish) props.onFinish(res.status === SUCCESS ? true : false, res);
            if(displayInSnackbar) {
                // console.log(res);
                showStackedSnackBar({message: res.message, options: { variant: res.status}})(dispatch);
                // showSnackBar({message: res.message, severity: res.status})(dispatch);
            }
            if(displayInConsole) console.log(res);
        }catch(error: any){
            // console.log(error);
            dispatch({
                status: ActionStatus.Failure,
                data: null,
                type: type
            });
            if(props.onFinish) props.onFinish(false);
            if(displayInSnackbar) {
                showStackedSnackBar({message: error, options: {variant: 'error'}})(dispatch);
                //showSnackBar({message: error, severity: 'error'})(dispatch);
            }
            if(displayInConsole) console.error(error);
        }
    }
}

interface IDefaultActionProps<T>{
    data: T;
    onFinish?: (success: boolean, result?: any) => void;
}
export function defaultAction<T>({...props}: IDefaultActionProps<T>){
    return async (dispatch: Dispatch<any>, type: string) => {
        try{
            dispatch({
                type: type,
                status: ActionStatus.Pending,
                data: null
            });
            dispatch({
                type: type,
                status: ActionStatus.Success,
                data: props.data,
            });
            if(props.onFinish) props.onFinish(true, props.data);
        }catch(error: any){
            console.error(error);
            dispatch({
                type: type,
                status: ActionStatus.Failure,
                data: null
            });
            if(props.onFinish) props.onFinish(false);
        }
    }
}