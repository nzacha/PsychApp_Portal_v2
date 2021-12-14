import { Control } from "react-hook-form";

export interface IControllerProps{
    name: string;
    control: Control<any>;
    rules: Object;
}