import { ActionStatus } from "../redux/common/actions";

export interface IFormItem<T>{
    value: T;
    hasChanged: boolean;
    status?: ActionStatus;
}

export function newFormItem<T>(value: T, hasChanged: IFormItem<T>['hasChanged'], status?: IFormItem<T>['status']):IFormItem<T>{
    return {
        value: value,
        hasChanged: hasChanged,
        status: status,
    }
}