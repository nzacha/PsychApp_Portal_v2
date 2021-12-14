import { Typography } from "@mui/material";
import { ElementType } from "react";

type variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "inherit" | undefined;
interface ITitleProps{
    title: string;
    variant?: variant;
    component?: ElementType;
    style?: React.CSSProperties;
    textAlign?: 'left' | 'center' | 'right';
    contentEditable?: boolean;
    onBlur?: (event: any) => void;
    onClick?: (event: any) => void;
}
export function Title(props: ITitleProps) {
    return (
        <Typography
            variant={props?.variant ? props.variant : 'h6'}
            component={props?.component ? props.component : "div"}
            style={props?.style || {}}
            textAlign={props?.textAlign ? props.textAlign : 'center'}
            contentEditable={props?.contentEditable || false}
            suppressContentEditableWarning={true}
            onBlur={props?.onBlur || undefined}
            onClick={props?.onClick || undefined}
            paragraph
            ml={2} 
            my={0.5} 
            mx={1}
            px={1}
            py={0.2}
        >
            {props.title}
        </Typography>
    )
}
export default Title;