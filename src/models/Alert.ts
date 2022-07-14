import { BaseModel } from "../config/models";

export interface IAlertData extends BaseModel{
    alert_id: number;
    title: string;
    description: string;
    message: string;
    user_id: number;
    is_read: boolean;
}

