import React from 'react';
import { Box, Button, Fade, Paper } from '@mui/material';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Container from '../../components/common/GridContainer';
import GridLayout from '../../components/common/GridLayout';
import { drawerTransitionTime } from '../../navigation';
import Title from '../../components/common/Title';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '../../components/common/FormControl/ControlledTextField';
import { defaultAction, defaultAPIAction } from '../../redux/common/actions';
import { LOG_IN } from '../../redux/staticReducers/authReducer/types';
import { HttpMethod } from '../../config/httpMethods';
import { setToken } from '../../redux/staticReducers/authReducer/reducer';
import { RequiredField } from '../../components/common/FormControl';
import { showSnackBar } from '../../components/Snackbar';

interface IRegisterForm{
    email: string;
    password: string;
}
const initialValues: IRegisterForm = {
    email: '',  
    password: '',
}
function LoginPage(){
	const dispatch = useDispatch();
	const history = useHistory();
	React.useEffect(() => {
		setToken(null, (res) => {
			defaultAction({data: null})(dispatch, LOG_IN)
		})
	}, [dispatch])

	const {control, getValues} = useForm<any>({ defaultValues: initialValues});
	return (
		<form style={{height: '100%'}}>
			<Fade in={true} timeout={drawerTransitionTime}>
			<Box component={'section'} style={{height: '100%'}}>
				<Container direction={'column'} fullWidth>
				<Container xl={3} lg={4} md={6} sm={9} xs={12} direction={'row'} containerStyle={{ boxSizing: 'border-box', padding: '1em' }}>
					<Paper variant={'elevation'} elevation={5} style={{ height: '100%', boxSizing: 'border-box', padding: '2em' }}>
					<GridLayout
						elements={[
							{
								id: 'title',
								element: (<Title title={'Login'}/>),
								xs: 12,
							},{
								id: 'username',
								// error helperText={'hello'} 
								element: (<ControlledTextField name={'email'} control={control} rules={{required: RequiredField()}} label={'Username'} size={'medium'} variant={'outlined'} fullWidth/>),
								xs: 12,
							},{
								id: 'password',
								element: (<ControlledTextField type={'password'} name={'password'} rules={{required: RequiredField()}} control={control} label={'Password'} size={'medium'} variant={'outlined'} fullWidth/>),
								xs: 12,
							},{
								id: 'submit',
								element: (
									<Container xs={4}>
										<Button 
											onClick={(event) => {
												defaultAPIAction({
													path: `/auth/login`,
													method: HttpMethod.POST,
													body: {
														email: getValues('email'),
														password: getValues('password'),
													},
													onFinish: (success, result ) => {
														if(success){
															setToken(result?.data?.response?.token);
															history.push('/');
														}else{
															console.log(result)
															showSnackBar({message: result?.message || 'Error while communicating with database', severity: 'error'})(dispatch);
														}
													}
												})(dispatch, LOG_IN)
											}}
											variant={'contained'} size={'large'} fullWidth>Login</Button>
									</Container>
								),
								xs: 12
							},{
								id: 'register',
								justify: 'center',
								element: (
										<Container xs={4} style={{textAlign: 'center'}}>
												<Link to="/register">Register</Link>
										</Container>
								),
								xs: 12,
							}
						]}
					/>
					</Paper>
				</Container>
				</Container>
			</Box>
			</Fade>
		</form>
	);
}

export default React.memo(LoginPage);