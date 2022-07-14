import { BaseTextFieldProps, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IControllerProps } from '..';

interface IControllerTextFieldProps
    extends IControllerProps,
        Omit<BaseTextFieldProps, 'name'> {
    label: string;
    onChange?: (event: any) => void;
}
export function ControlledTextField({
    name,
    control,
    rules,
    onChange,
    ...rest
}: IControllerTextFieldProps) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <TextField
                    {...rest}
                    value={field.value}
                    onChange={(event) => {
                        field.onChange(event);
                        if (onChange) {
                            onChange(event);
                        }
                    }}
                />
            )}
        />
    );
}
