import { BaseModel } from "../config/models";
import { IProjectParticipantData } from "./ProjectParticipant";
import { IQuizQuestionData } from "./QuizQuestion";

export interface IQuizAnswerData extends BaseModel{
    answer_id: number;
    answer: string;
    index: number;
    date: string;
    question_id: number;
    project_participant: IProjectParticipantData;
    quiz_question: IQuizQuestionData;
}

