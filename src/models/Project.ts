import { BaseModel } from "../config/models";
import { IQuizData } from "./Quiz";
import { IUserData } from "./Users";

export interface IProjectData extends BaseModel{
    project_id: number;
    name: string;
    description: string;
    quizzes: IQuizData[];
    director_id: number;
    director: IUserData;
    study_length: number;
    tests_per_day: number;
    tests_time_interval: number;
    allow_individual_times: boolean;
    allow_user_termination: boolean;
    automatic_termination: boolean;
    download_link: string;
    created_by: string;
    modified_by: string;
}

