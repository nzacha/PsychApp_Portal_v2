import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'; //Router, 
// import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@mui/system'; //styled, createTheme, 
import { useTheme } from '@mui/material';

//Navigation
import NavBars from './navigation';
//Authentication
import LoginPage from './scenes/Authentication/LoginPage';
import RegisterPage from './scenes/Authentication/RegisterPage';
//Pages
import HomePage from './scenes/HomePage';
import QuerySelectorPage from './scenes/QuerySelector';
import UserManagerPage from './scenes/UserManager';
import MyProjectsPage from './scenes/MyProjectsPage';
import ProjectManagerPage from './scenes/ProjectManager';
import QuizEditorPage from './scenes/QuizEditor';
import ParticipantManagerPage from './scenes/ParticipantManager';
import AccountPage from './scenes/AccountPage';
import SettingsPage from './scenes/SettingsPage';

import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from './config/models';
import { HttpMethod } from './config/httpMethods';
import { SET_PROJECT_LIST, SET_SELECTED_PROJECT } from './scenes/MyProjectsPage/store/types';
import { ActionStatus, defaultAction, defaultAPIAction } from './redux/common/actions';
import { AppProvider } from './providers/AppProvider';
import React, { useState } from 'react';
import { PrivateRoute } from './components/PrivateRoute';
import { CookiesProvider } from 'react-cookie';
import { useSelectAuthData } from './redux/staticReducers/authReducer/selectors';
import { getToken, setToken } from './redux/staticReducers/authReducer/reducer';
import { configAxios } from './config/request';
import { showSnackBar } from './components/Snackbar';
import { LOG_IN } from './redux/staticReducers/authReducer/types';

function App() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const user = useSelectAuthData();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()));
  React.useEffect(() => {
    configAxios(dispatch);
    if(isLoggedIn) {
      defaultAPIAction({
        path: `/auth/validateToken`,
        method: HttpMethod.POST,
        body: { token: getToken() }, 
        onFinish: (success, res) => {
          if(success){
            const user = res.data.response.user; 
            user.token = getToken();
            defaultAction({data: user})(dispatch, LOG_IN)
            defaultAPIAction({
              path: `/${ModelNamesEnum.Project}/list/${user.user_id}`,
              method: HttpMethod.GET,
              onFinish: (success, res) => {
                if(success && res?.data?.response?.length > 0){
                  defaultAction({data: res.data.response[0].project_id})(dispatch, SET_SELECTED_PROJECT)
                }
              }
            })(dispatch, SET_PROJECT_LIST)   
          }else{
            setToken(null, () => {
              defaultAction({data: null})(dispatch, LOG_IN)
            })
          }
        }
      })(dispatch);
    } else {
      // showSnackBar({message: 'Session Expired', severity: 'error'})(dispatch)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoggedIn]);

  React.useEffect(() => {
    if(user.status == ActionStatus.Success){
      setIsLoggedIn(Boolean(user.data?.token));
    } 
  }, [user, getToken()]);

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <BrowserRouter>
              <NavBars renderSideBar={isLoggedIn} renderNavBar={isLoggedIn} >
                <Switch>
                  <Route key={'login'} path="/login" component={LoginPage} />
                  <Route key={'register'} path="/register" component={RegisterPage} />
                  <PrivateRoute key={'homepage'} exact path="/" component={HomePage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'querySelector'} path="/querySelector" component={QuerySelectorPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'myProjects'} path="/myProjects" component={MyProjectsPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'projectManagement'} path="/projectManagement" component={ProjectManagerPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'userManagement'} path="/userManagement" component={UserManagerPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'participationManagement'} path="/participationManagement" component={ParticipantManagerPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'quiz'} path="/quiz" component={QuizEditorPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'account'} path="/account" component={AccountPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <PrivateRoute key={'settings'} exact path="/settings" component={SettingsPage} redirectTo={'/login'} isLoggedIn={isLoggedIn}/>
                  <Redirect from="*" to="/" />
                </Switch>
              </NavBars>
          </BrowserRouter>
        </CookiesProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;