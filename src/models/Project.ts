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
    created_by: string;
    modified_by: string;
}

