import React, { useState } from "react";
import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import { showSnackBar } from "../../components/Snackbar";
import { useForm } from "react-hook-form";
import { ControlledTextField } from "../../components/common/FormControl/ControlledTextField";
import { RequiredField, MinLengthField } from "../../components/common/FormControl";
import { defaultAPIAction } from "../../redux/common/actions";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import { useDispatch } from "react-redux";
import { useSelectAuthData } from "../../redux/staticReducers/authReducer/selectors";

interface IChangePasswordDialogProps{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IFormData{
    password: string;
    confirmPassword: string;
}
export function ChangePasswordDialog({open, setOpen}: IChangePasswordDialogProps){
    const { handleSubmit, control, formState, getValues, reset } = useForm<IFormData>({shouldUnregister: false});
    const dispatch = useDispatch();
    const user = useSelectAuthData();

    React.useEffect(() => {
        reset();
    },[open])

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent style={{minWidth: '300px'}}>
            <Stack spacing={2}>
                <DialogContentText>Set New Password</DialogContentText>
                <ControlledTextField 
                    label={'New Password'} 
                    fullWidth 
                    type={'password'}
                    name={'password'}
                    control={control}
                    rules={{required: RequiredField(), minLength: MinLengthField(8)}}
                    required
                    error={'password' in formState.errors}
                    helperText={formState.errors.password?.message}
                />
                <ControlledTextField 
                    label={'Confirm Password'} 
                    fullWidth 
                    type={'password'}
                    name={'confirmPassword'}
                    control={control}
                    rules={{required: RequiredField(), minLength: MinLengthField(8), validate: () => getValues('password') == getValues('confirmPassword') || 'Passwords do not match'}}
                    required
                    error={'confirmPassword' in formState.errors}
                    helperText={formState.errors.confirmPassword?.message}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => {
                handleSubmit((data) => {
                    defaultAPIAction({
                        path: `/${ModelNamesEnum.User}/${user.data?.user_id}`,
                        method: HttpMethod.PATCH,
                        body: {
                            password: data.password
                        },
                        onFinish: (s, r) => {
                            if(s) {
                                showSnackBar({message: 'Password Updated Successfully', severity: 'success'})(dispatch);
                                setOpen(false);
                            }else{
                                showSnackBar({message: 'Password change failed', severity: 'error'})(dispatch);
                            }
                        }
                    })(dispatch, '') 
                }, (errors) => {console.log(errors)})();
            }}>Save</Button>
        </DialogActions>
    </Dialog>  
    )
}