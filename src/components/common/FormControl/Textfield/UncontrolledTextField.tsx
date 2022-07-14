import { CircularProgress, TextField, Divider, Fade, Box } from '@mui/material';
import { drawerTransitionTime } from 'navigation';
import { useEffect } from 'react';
import { useState } from 'react';

interface IUncontrolledTextFieldProps {
    initialValue: string;
    label?: JSX.Element;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, valueChanges?: boolean) => void;
    placeholder?: string;
    error?: {};
    fullWidth?: boolean;
    multiline?: boolean;
}
export function UncontrolledTextField({
    placeholder,
    label,
    initialValue,
    fullWidth,
    multiline,
    ...props
}: IUncontrolledTextFieldProps) {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialValue != undefined) {
            setValue(initialValue);
            setLoading(false);
        }
    }, [initialValue]);

    const open = loading && initialValue != value;
    return (
        <TextField
            placeholder={placeholder}
            label={label}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
                if (props.onChange) {
                    props.onChange(e);
                }
            }}
            onBlur={(e) => {
                if (value != initialValue) setLoading(true);
                if (props.onBlur) props.onBlur(e);
            }}
            InputProps={{
                endAdornment: (
                    <Fade in={open} timeout={drawerTransitionTime}>
                        <Box display={'flex'} alignItems={'center'}>
                            <CircularProgress
                                size={open ? '2rem' : 0}
                                style={{
                                    transition: `width ${drawerTransitionTime}ms, height ${drawerTransitionTime}ms`,
                                }}
                            />
                        </Box>
                    </Fade>
                ),
            }}
            fullWidth={fullWidth}
            multiline={multiline}
        />
    );
}
