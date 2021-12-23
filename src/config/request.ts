import axios, { AxiosResponse, Method } from "axios";
import { Dispatch } from "react";
import { getState } from "..";
import { showSnackBar } from "../components/Snackbar";
import { defaultAction } from "../redux/common/actions";
import { ReducerKeys } from "../redux/config";
import { setToken } from "../redux/staticReducers/authReducer/reducer";
import { LOG_IN } from "../redux/staticReducers/authReducer/types";
import Environment from "./environment";
import { ERROR, IResponse } from "./response";

interface IRequestProps{
    path: string;
    method: Method;
    params?: {};
    body?: {};
    next?: (response: AxiosResponse) => void;
    displayInConsole?: boolean;
}

export function configAxios(dispatch: Dispatch<any>){
    axios.interceptors.request.use(
        async (config) => {
            // get refresh token
            const token = getState(ReducerKeys.AUTH_REDUCER).logged_in_user?.data?.token;
            if (token && config.headers) {
                config.headers['x-access-token'] = `${token}`;
            }
            return config;
        },
        (error) => {}
    );

    axios.interceptors.response.use(
        async (response) => {
            return response
        },
        (errorString: any) => {
            const error = JSON.parse(JSON.stringify(errorString));
            console.error(error)
            if(error.status === 401 || error.status === 403){
                setToken(null, (res) => {
                    defaultAction({data: null})(dispatch, LOG_IN)
                })
                showSnackBar({message: 'Session Expired', severity: 'error'})(dispatch)
                console.error('jwt expired')
            }
        }
    );
}
    
export const request: (props: IRequestProps) => Promise<IResponse> = async ({displayInConsole = false, ...props}: IRequestProps) => {
    if(displayInConsole) console.log(Environment.API_BASE_URL + props.path);
    try{
        const result = await axios({
            method: props.method,
            url: Environment.API_BASE_URL + props.path,
            params: props.params,
            data: props.body,
            responseType: 'json',
        })
        if(props.next) props.next(result);
        return result.data;
    }catch(error: any){
        return {
            status: ERROR,
            message: `error ocurred for request: ${props.method} ${props.path}`,
            data: null,
        }
    }
}
export default request