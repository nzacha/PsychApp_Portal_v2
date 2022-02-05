import { BaseModel } from "../config/models";

export interface IProjectParticipantData extends BaseModel{
    participant_id: number;
    authentication_code: string;
    name: string;
    project_id: number;
    progress: number;
    is_active: boolean;
    deactivation_reason: string;
}   