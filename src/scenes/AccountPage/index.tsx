import React, { useState } from "react";
import { Alert, AlertTitle, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import { drawerTransitionTime } from "../../navigation";
import { useDispatch } from "react-redux";
import GridLayout from "../../components/common/GridLayout";
import AccountIcon from '@mui/icons-material/AccountCircle';
import { IFormItem, newFormItem } from "../../config/formItem";
import { defaultAPIAction } from "../../redux/common/actions";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import { useSelectAuthData } from "../../redux/staticReducers/authReducer/selectors";
import { showSnackBar } from "../../components/Snackbar";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

const UserEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const user = useSelectAuthData();

    const [email, setEmail] = useState<IFormItem<string>>(newFormItem('', false));
    const [phone, setPhone] = useState<IFormItem<string>>(newFormItem('', false));
    const [name, setName] = useState<IFormItem<string>>(newFormItem('', false));
    const [lastName, setLastName] = useState<IFormItem<string>>(newFormItem('', false));
    
    React.useEffect(() => {
        if(user.data)
            defaultAPIAction({
                path: `/${ModelNamesEnum.User}/${user.data.user_id}`,
                method: HttpMethod.GET,
                onFinish: (success, res) => {
                    const data = res.data.response;
                    setEmail(newFormItem(data.email, false));
                    setPhone(newFormItem(data.phone, false));
                    setName(newFormItem(data.first_name, false));
                    setLastName(newFormItem(data.last_name, false));
                }
            })(dispatch, '') 
    }, [dispatch, user]);

    const [open, setOpen] = useState(false);
    return (
    <>
        <ChangePasswordDialog open={open} setOpen={setOpen}/>
        <Fade in={true} timeout={drawerTransitionTime}>
            <Paper variant={'elevation'} elevation={5} style={{textAlign: 'center', padding: '1em', margin: '1em', backgroundColor: theme.palette.grey[200]}} >
                <Typography variant='h4' paragraph style={{display: 'inline-flex'}}>
                    <AccountIcon fontSize={'large'} style={{marginRight: '0.5em'}}/> Account Editor
                </Typography>
                <Typography variant='h6' paragraph>Here, you can edit your account information</Typography>
                <GridLayout justify={'center'} lg={8} md={10} xs={12} style={{margin: 'auto'}}
                    elements={[
                        {
                            id: 'email',
                            element: (
                                <TextField label={'Email'} fullWidth value={email.value} onChange={event => {
                                    setEmail(newFormItem(event.target.value, true));
                                }} onBlur={event => {
                                    if (user.data) {
                                        defaultAPIAction({
                                            path: `/${ModelNamesEnum.User}/${user.data.user_id}`,
                                            method: HttpMethod.PATCH,
                                            body:{
                                                
                                                email: event.target.value
                                            },
                                            onFinish: (success, res) => {
                                                setEmail(newFormItem(event.target.value, false));
                                            }
                                        })(dispatch, '') 
                                    }
                                }}/>
                            ),
                            xs: 6
                        },{
                            id: 'phone',
                            element: (
                                <TextField label={'Phone'} fullWidth value={phone.value} onChange={event => {
                                    setPhone(newFormItem(event.target.value, true))
                                }} onBlur={event => {
                                    if (user.data) {
                                        defaultAPIAction({
                                            path: `/${ModelNamesEnum.User}/${user.data.user_id}`,
                                            method: HttpMethod.PATCH,
                                            body:{
                                                
                                                phone: event.target.value
                                            },
                                            onFinish: (success, res) => {
                                                setPhone(newFormItem(event.target.value, false));
                                            }
                                        })(dispatch, '') 
                                    }
                                }}
                                />
                            ),
                            xs: 6
                        },{
                            id: 'name',
                            element: (
                                <TextField label={'Name'} fullWidth value={name.value} onChange={event => {
                                    setName(newFormItem(event.target.value, true));
                                }} onBlur={event => {
                                    if (user.data) {
                                        defaultAPIAction({
                                            path: `/${ModelNamesEnum.User}/${user.data.user_id}`,
                                            method: HttpMethod.PATCH,
                                            body:{
                                                
                                                first_name: event.target.value
                                            },
                                            onFinish: (success, res) => {
                                                setName(newFormItem(event.target.value, false));
                                            }
                                        })(dispatch, '') 
                                    }
                                }}/>
                            ),
                            xs: 6
                        },{
                            id: 'last_name',
                            element: (
                                <TextField label={'Last Name'} fullWidth value={lastName.value} onChange={event => {
                                    setLastName(newFormItem(event.target.value, true))
                                }} onBlur={event => {
                                    if (user.data) {
                                        defaultAPIAction({
                                            path: `/${ModelNamesEnum.User}/${user.data.user_id}`,
                                            method: HttpMethod.PATCH,
                                            body:{
                                                
                                                last_name: event.target.value
                                            },
                                            onFinish: (success, res) => {
                                                setLastName(newFormItem(event.target.value, false));
                                            }
                                        })(dispatch, '') 
                                    }
                                }}/>
                            ),
                            xs: 6
                        }
                    ]}
                />
                <Box>
                   <Button variant="contained" onClick={() => setOpen(true)}>Change Password</Button> 
                </Box>
            </Paper>
        </Fade>
        </>
    )
})
export default UserEditor;