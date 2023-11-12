export enum ModelEnum{
    User  = 'User',
    // Role  = 'Role',
    Project = 'Project',
    Project_Participant = 'Project_Participant',
    Quiz = 'Quiz',
    Quiz_Section = 'Quiz_Section',
    Quiz_Question = 'Quiz_Question',
    Quiz_Answer = 'Quiz_Answer',
    Quiz_Option = 'Quiz_Option',
    Project_User_Link = 'Project_User_Link',
    Alert = 'Alert',
    ChatRoom = 'Chat_Room',
    ChatMessage = 'Chat_Message',
}

export const ModelNamesEnum = {
    // [ModelEnum.Role]: 'role',
    [ModelEnum.Project]: 'project',
    [ModelEnum.Project_Participant]: 'participant',
    [ModelEnum.User]: 'user',
    [ModelEnum.Quiz]: 'quiz',
    [ModelEnum.Quiz_Section]: 'section',
    [ModelEnum.Quiz_Question]: 'question',
    [ModelEnum.Quiz_Answer]: 'answer',
    [ModelEnum.Quiz_Option]: 'question_option',
    [ModelEnum.Project_User_Link]: 'project_user_link',
    [ModelEnum.Alert]: 'alert',
    [ModelEnum.ChatRoom]: 'chat_room',
    [ModelEnum.ChatMessage]: 'chat_mesasage',
}


export interface BaseModel{
    createdAt?: Date;
    updatedAt?: Date;
}