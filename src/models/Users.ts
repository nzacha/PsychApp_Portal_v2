import { BaseModel } from "../config/models";
import { IProjectUserLinkData } from "./ProjectUserLink";

export interface IUserData extends BaseModel{
    user_id: number;
    email: string;
    is_super_user: boolean;
    first_name: string;
    last_name: string;
    project_user_link: IProjectUserLinkData;
    token: string;
}