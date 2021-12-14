import { BaseModel } from "../config/models";

export interface IProjectUserLinkData extends BaseModel{
    project_id: number;
    user_id: number;
    can_edit: boolean;
}