import { IconButton, IconButtonProps, styled } from "@mui/material";

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
export const ExpandMoreWrapper = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));