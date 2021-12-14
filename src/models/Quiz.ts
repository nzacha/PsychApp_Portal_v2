import { BaseModel } from "../config/models";
import { IQuizSectionData } from "./QuizSection";

export interface IQuizData extends BaseModel{
    quiz_id: number;
    name: string;
    description: string;
    project_id: number;
    quiz_sections: IQuizSectionData[];
}

