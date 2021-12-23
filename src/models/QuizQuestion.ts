import { BaseModel } from "../config/models";
import { IQuizOptionData } from "./QuizOption";

export enum QuizQuestionType{
    TEXT = 'Text',
    SLIDER = 'Slider'
}

export enum QuizQuestionAlignment{
    HORIZONTAL = 'Horizontal',
    VERTICAL = 'Vertical'
}

export interface IQuizQuestionData extends BaseModel{
    question_id: number;
    question: string;
    type: QuizQuestionType;
    alignment: QuizQuestionAlignment;
    levels: number;
    request_reason: boolean;
    question_options: IQuizOptionData[];
    section_id: number;
}

