export enum ModelEnum{
    User  = 'User',
    // Role  = 'Role',
    Project = 'Project',
    Project_Participant = 'Project_Participant',
    Quiz = 'Quiz',
    Quiz_Section = 'Quiz_Section',
    Quiz_Question = 'Quiz_Question',
    Quiz_Option = 'Quiz_Option',
    Project_User_Link = 'Project_User_Link'
}

export const ModelNamesEnum = {
    // [ModelEnum.Role]: 'role',
    [ModelEnum.Project]: 'project',
    [ModelEnum.Project_Participant]: 'participant',
    [ModelEnum.User]: 'user',
    [ModelEnum.Quiz]: 'quiz',
    [ModelEnum.Quiz_Section]: 'section',
    [ModelEnum.Quiz_Question]: 'question',
    [ModelEnum.Quiz_Option]: 'option',
    [ModelEnum.Project_User_Link]: 'project_user_link',
}

export interface BaseModel{
    createdAt?: Date;
    updatedAt?: Date;
}