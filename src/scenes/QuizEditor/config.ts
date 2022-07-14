import { HttpMethod } from "config/httpMethods";
import { ModelNamesEnum } from "config/models";
import request from "config/request";
import { IQuizOptionData } from "models/QuizOption";
import { IQuizQuestionData } from "models/QuizQuestion";

export async function insertQuestion(section_id: number){
    return await request({
        path: `/${ModelNamesEnum.Quiz_Question}/`,
        method: HttpMethod.PUT,
        body: {
            section_id: section_id,
            question: 'new question'
        }
    })
}

export async function updateQuestion(question_id: number, question: Partial<IQuizQuestionData>){
    return await request({
        path: `/${ModelNamesEnum.Quiz_Question}/${question_id}`,
        method: HttpMethod.PATCH,
        body: question
    })
}

export async function removeQuestion(question_id: number){
    return await request({
        path: `/${ModelNamesEnum.Quiz_Question}/${question_id}`,
        method: HttpMethod.DELETE,
    })
}

export async function insertQuestionOption(question_id: number){
    return await request({
        path: `/${ModelNamesEnum.Quiz_Option}`,
        method: HttpMethod.PUT,
        body: {
            question_id: question_id,
            option: 'new option'
        }
    })
}

export async function updateQuestionOption(option_id: number, option: Partial<IQuizOptionData>){
    return await request({
        path: `/${ModelNamesEnum.Quiz_Option}/${option_id}`,
        method: HttpMethod.PATCH,
        body: option
    })
}


export async function removeQuestionOption(option_id: number){
    return await request({
        path: `/${ModelNamesEnum.Quiz_Option}/${option_id}`,
        method: HttpMethod.DELETE,
    })
}