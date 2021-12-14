import { BaseModel } from "../config/models";

export interface IProjectParticipantData extends BaseModel{
    participant_id: number;
    authentication_code: string;
    name: string;
    project_id: number;
}   