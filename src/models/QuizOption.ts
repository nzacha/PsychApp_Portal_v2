import { BaseModel } from "../config/models";

export interface IQuizOptionData extends BaseModel{
    question_option_id: number;
    option: string;
    question_id: number;
}