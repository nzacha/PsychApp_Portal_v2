import React, { MemoExoticComponent, useState } from 'react';
import { Redirect, RouteProps } from 'react-router-dom';

interface IPrivateRoute extends Omit<RouteProps, 'component'>{
    component: MemoExoticComponent<() => JSX.Element>;
    redirectTo: string;
    isLoggedIn: boolean;
}
export const PrivateRoute = ({redirectTo, isLoggedIn, ...props}: IPrivateRoute):React.ReactElement => {
    return isLoggedIn ? <props.component/> : <Redirect to={{ pathname: redirectTo}} />
}
