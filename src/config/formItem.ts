import { ActionStatus } from "../store/common/actions";

export interface IFormItem<T>{
    value: T;
    hasChanged: boolean;
    status?: ActionStatus;
    error?: string;
}

export function newFormItem<T>(value: T, hasChanged: IFormItem<T>['hasChanged'], status?: IFormItem<T>['status'], error?: string):IFormItem<T>{
    return {
        value: value,
        hasChanged: hasChanged,
        status: status,
        error: error
    }
}