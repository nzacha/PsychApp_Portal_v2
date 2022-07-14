import { Box, Button, ButtonProps, IconButton } from '@mui/material';
import useWindowDimensions from 'hooks/useWindowDimensions';

interface ResponsiveButtonProps extends ButtonProps {
    Icon?: JSX.Element;
}
export function ResponsiveButton({ Icon, title, style, ...props }: ResponsiveButtonProps) {
    const { isSmallScreen } = useWindowDimensions();
    return (
        <Box>
            {!title ? (
                <IconButton {...props} style={style} title={title}>
                    {Icon && Icon}
                </IconButton>
            ) : (
                <Button
                    variant={'contained'}
                    {...props}
                    style={{
                        ...style,
                        textTransform: 'none',
                    }}
                    endIcon={Icon}
                >
                    {title}
                </Button>
            )}
        </Box>
    );
}
