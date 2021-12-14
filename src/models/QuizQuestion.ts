import { BaseModel } from "../config/models";

export enum QuizQuestionType{
    TEXT = 'Text',
    SLIDER = 'Slider'
}

export enum QuizQuestionAlignment{
    HORIZONTAL = 'Horizontal',
    VERTICAL = 'Verical'
}

export interface IQuizQuestionData extends BaseModel{
    question_id: number;
    type: QuizQuestionType;
    alignment: QuizQuestionAlignment;
    question: string;
    section_id: number;
}

