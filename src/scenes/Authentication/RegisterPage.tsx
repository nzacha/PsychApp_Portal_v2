import React from 'react';
import { Box, Fade, Button, Card, CardContent, CardHeader, IconButton, styled, TextField } from '@mui/material';
import { Link, Redirect, useHistory } from 'react-router-dom';
import GridLayout from '../../components/common/GridLayout';
import GridContainer from '../../components/common/GridContainer';
import { useDispatch } from 'react-redux';

import { drawerTransitionTime } from '../../navigation';
import { defaultAction } from '../../redux/common/actions';
import { LOG_IN } from '../../redux/staticReducers/authReducer/types';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '../../components/common/FormControl/ControlledTextField';
import { RequiredField } from '../../components/common/FormControl/RequiredField';

const ExpandMore = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface IRegisterForm {
    first_name: string ;
    last_name: string;
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}
const initialValues: IRegisterForm = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
}
function RegisterPage(){
    const dispatch = useDispatch();
    const history = useHistory();
    
    React.useEffect(() => {
        defaultAction({data: null})(dispatch, LOG_IN);
    }, [dispatch])

    const { control, watch, trigger, getValues, clearErrors, handleSubmit, formState } = useForm({reValidateMode: 'onChange', defaultValues: initialValues});
    const password = watch('password');
    const confirm_password = watch('confirm_password');
    return (
        <Fade in={true} timeout={drawerTransitionTime}>
        <Box style={{ height: '100%', boxSizing: 'border-box'}}>
            <GridContainer lg={6} md={8} sm={10} xs={12}  direction={'row'} containerStyle={{boxSizing: 'border-box', padding: '1em' }}>
                <Card variant={'elevation'} elevation={5} style={{padding: '1em'}}>
                    <CardHeader
                        title="Please fill All Form Fields"
                        // subheader="September 14, 2016"
                        // action={
                        //     <IconButton aria-label="settings">
                        //         <MoreVertIcon />
                        //     </IconButton>
                        // }
                    />
                    <CardContent>
                        <GridLayout elements={[{
                                id: 'first_name',
                                element: (
                                    <ControlledTextField name={'first_name'} control={control} error={'first_name' in formState.errors} helperText={formState.errors.first_name?.message} rules={{required: <RequiredField/>}} label={'First Name'} size={'medium'} variant={'outlined'} style={{marginLeft: '0em'}} fullWidth required />
                                ),
                                sm: 6,
                                xs: 12,
                            },{
                                id: 'last_name',
                                element: (
                                    <ControlledTextField name={'last_name'} control={control} error={'last_name' in formState.errors} helperText={formState.errors.last_name?.message} rules={{required: <RequiredField/>}} label={'Last Name'} size={'medium'} variant={'outlined'} style={{marginRight: '0em'}} fullWidth required />
                                ),
                                sm: 6,
                                xs: 12,
                            },{
                                id: 'email',
                                element: (
                                    <ControlledTextField name={'email'} control={control} error={'email' in formState.errors} helperText={formState.errors.email?.message} rules={{required: <RequiredField/>}} type={'email'} label={'Email'} size={'medium'} variant={'outlined'} style={{marginLeft: '0em'}} fullWidth required />
                                ),
                                sm: 6,
                                xs: 12,
                            },{
                                id: 'username',
                                element: (
                                    <ControlledTextField name={'username'} control={control} error={'username' in formState.errors} helperText={formState.errors.username?.message} rules={{required: <RequiredField/>}} label={'Username'} size={'medium'} variant={'outlined'} style={{marginRight: '0em'}} fullWidth required />
                                ),
                                sm: 6,
                                xs: 12,
                            },{
                                id: 'password',
                                element: (
                                    <ControlledTextField name={'password'} control={control} error={'password' in formState.errors} helperText={formState.errors.password?.message} rules={{required: <RequiredField/>, minLength: {value: 8, message: 'Password must contain at least 8 characters'}}} type={'password'} label={'Password'} size={'medium'} variant={'outlined'} style={{marginLeft: '0em'}} fullWidth required />
                                ),
                                sm: 6,
                                xs: 12,
                            },{
                                id: 'confirm_password',
                                element: (
                                    <ControlledTextField name={'confirm_password'} control={control} error={'confirm_password' in formState.errors} helperText={formState.errors.confirm_password?.message} rules={{required: <RequiredField/>, validate: {missmatch: () => (password == confirm_password) || 'Passwords do not match'}}} onBlur={() => {confirm_password.length > 0 && trigger('confirm_password')}} type={'password'} label={'Confirm Password'} size={'medium'} variant={'outlined'} style={{marginRight: '0em'}} fullWidth required />
                                ),
                                sm: 6,
                                xs: 12,
                            },{
                                id: 'submit',
                                element: (
                                    <GridContainer md={3} sm={4} xs={5}>
                                        <Button variant={'contained'} size={'large'} fullWidth 
                                            onClick={(event) => {
                                                handleSubmit((data) => {
                                                    console.log(data);
                                                },(errors) => {
                                                    console.log(errors);
                                                })();
                                            }} 
                                        >Register</Button>
                                    </GridContainer>
                                ),
                                xs: 12,
                            },{
                                id: 'cancel',
                                element: (<Link to="/login">Cancel</Link>),
                                justify: 'center',
                                xs: 12,
                            }
                        ]}
                        />
                    </CardContent>
                    {/* <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={() => {
                                setExpanded(!expanded);
                            }}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Method:</Typography>
                        </CardContent>
                    </Collapse> */}
                </Card>
            </GridContainer>
        </Box>
        </Fade>
    );
}

export default React.memo(RegisterPage);