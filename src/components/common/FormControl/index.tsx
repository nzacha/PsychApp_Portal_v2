import { Control, RegisterOptions } from "react-hook-form";

export interface IControllerProps{
    name: string;
    control: Control<any>;
    rules: RegisterOptions;
}

export function RequiredField(){
    return `This Field is Required`;
}

export function MinLengthField(length: number){
    return {
        value: length,
        message: `Minimum length is ${length} characters`,
    };
}