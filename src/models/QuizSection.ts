import { BaseModel } from "../config/models";
import { IQuizQuestionData } from "./QuizQuestion";

export interface IQuizSectionData extends BaseModel{
    section_id: number;
    name: string;
    description: string;
    quiz_id: number;
    quiz_questions: IQuizQuestionData[];
}

