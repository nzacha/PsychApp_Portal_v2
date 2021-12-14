import { BaseModel } from "../config/models";

export interface IQuizAnswerData extends BaseModel{
    answer_id: number;
    answer: string;
    question_id: number;
}

