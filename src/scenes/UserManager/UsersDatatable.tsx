import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IUserData } from '../../models/Users';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, IconButton, InputAdornment, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionStatus, defaultAPIAction } from '../../redux/common/actions';
import { useDispatch } from 'react-redux';
import { IFormItem, newFormItem } from '../../config/formItem';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { DELETE_USER, INSERT_USER, UPDATE_USER } from './store/types';

interface IUserProps{
  index: number;
  data: IUserData;
  users: IUserData[];
  setUsers: React.Dispatch<any>;
}
function User(props: IUserProps) {
  const dispatch = useDispatch();
  const { data } = props;

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState<IFormItem<string>>(newFormItem('', false));
  const [firstName, setFirstName] = React.useState<IFormItem<string>>(newFormItem('', false));
  const [lastName, setLastName] = React.useState<IFormItem<string>>(newFormItem('', false));
  
  React.useEffect(() => {
    setFirstName(newFormItem(data.first_name || '', false));
    setLastName(newFormItem(data.last_name || '', false));
    setEmail(newFormItem(data.email || '', false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <React.Fragment>
      <TableRow style={{flex: 1}}>
        <TableCell align="left" style={{width: '10%'}}>
          {props.index}
        </TableCell>
        <TableCell align="center" style={{width: '30%'}}>
          <TextField 
            label={'Email'} 
            fullWidth 
            value={email.value}
            onChange={(event) => {
              setEmail(newFormItem(event.currentTarget.value, true));
            }}
            onBlur={(event) => {
                if(email.hasChanged){
                    setEmail({...email, status: ActionStatus.Pending});
                    defaultAPIAction({
                        path: `/${ModelNamesEnum.User}/${props.data.user_id}`,
                        method: HttpMethod.PATCH,
                        body: {
                            first_name: firstName.value,
                        },
                        onFinish: (success: boolean, result) => {
                            if(success){
                              setEmail(newFormItem(email.value, false, ActionStatus.Success));
                            }
                        }
                    })(dispatch, UPDATE_USER)
                }
            }}
            InputProps={{
                endAdornment: (
                  <Box>
                    <InputAdornment position="end">
                      <Fade in={firstName.status === ActionStatus.Pending}>
                          <CircularProgress/>
                      </Fade>
                    </InputAdornment>
                  </Box>
                )
            }}
          />
        </TableCell>
        <TableCell align="center" style={{width: '25%'}}>
          <TextField 
            label={'First Name'} 
            fullWidth 
            value={firstName.value}
            onChange={(event) => {
                setFirstName(newFormItem(event.currentTarget.value, true));
            }}
            onBlur={(event) => {
                if(firstName.hasChanged){
                    setFirstName({...firstName, status: ActionStatus.Pending});
                    defaultAPIAction({
                        path: `/${ModelNamesEnum.User}/${props.data.user_id}`,
                        method: HttpMethod.PATCH,
                        body: {
                            first_name: firstName.value,
                        },
                        onFinish: (success: boolean, result) => {
                            if(success){
                              setFirstName(newFormItem(firstName.value, false, ActionStatus.Success));
                            }
                        }
                    })(dispatch, UPDATE_USER)
                }
            }}
            InputProps={{
                endAdornment: (
                  <Box>
                    <InputAdornment position="end">
                      <Fade in={firstName.status === ActionStatus.Pending}>
                          <CircularProgress/>
                      </Fade>
                    </InputAdornment>
                  </Box>
                )
            }}
          />
        </TableCell>
        <TableCell align="center" style={{width: '25%'}}>
          <TextField 
            label={'Last Name'} 
            fullWidth 
            value={lastName.value}
            onChange={(event) => {
                setLastName(newFormItem(event.currentTarget.value, true));
            }}
            onBlur={(event) => {
                if(lastName.hasChanged){
                    setLastName({...lastName, status: ActionStatus.Pending});
                    defaultAPIAction({
                        path: `/${ModelNamesEnum.User}/${props.data.user_id}`,
                        method: HttpMethod.PATCH,
                        body: {
                            last_name: lastName.value,
                        },
                        onFinish: (success: boolean, result) => {
                            if(success){
                              setLastName(newFormItem(lastName.value, false, ActionStatus.Success));
                            }
                            // console.log(result)
                        }
                    })(dispatch, UPDATE_USER)
                }
            }}
            InputProps={{
                endAdornment: (
                  <Box>
                    <InputAdornment position="end">
                      <Fade in={lastName.status === ActionStatus.Pending}>
                          <CircularProgress/>
                      </Fade>
                    </InputAdornment>
                  </Box>
                )
            }}  
          />
        </TableCell>
        <TableCell align="center" style={{width: '15%'}}>
          <IconButton onClick={(event) => {
              defaultAPIAction({
                  path: `/${ModelNamesEnum.User}/${props.data.user_id}`,
                  method: HttpMethod.DELETE,
                  onFinish: (success: boolean, payload) => {
                    if(success){
                      let newUsers = props.users.slice();
                      newUsers = newUsers.filter(item => item.user_id !== props.data.user_id)
                      props.setUsers(newUsers);
                      // props.onRefresh();
                    }
                  }
              })(dispatch, DELETE_USER)
          }}>
              <DeleteIcon/>
          </IconButton>
      </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface IUserDatatableProps{
  users: IUserData[];
  setUsers: React.Dispatch<any>;
}
export function UsersDatatable(props: IUserDatatableProps) {
  // console.log(props.data);
  const dispatch = useDispatch<any>();
  const [open, setOpen] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState('');
  return (
    <>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The registration result will be sent to the following email
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            autoComplete={'none'}
            fullWidth
            variant="standard"
            value={newEmail}
            onChange={(event) => setNewEmail(event.currentTarget.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button disabled={newEmail.length === 0} onClick={() => {
          if (isValidEmail(newEmail)){
            defaultAPIAction({
              path: `/user/new`,
              method: HttpMethod.PUT,
              body: {
                email: newEmail, first_name: 'new user'
              },
              onFinish: (success: boolean, result) => {
                console.log(result);
                if(success && result?.data?.response){
                    // console.log(result)
                    let newUsers = props.users.slice();
                    newUsers.push(result.data.response);
                    props.setUsers(newUsers);
                    // props.onRefresh();
                }
                setOpen(false);  
              }
            })(dispatch, INSERT_USER)
          }else{
            console.log('invalid email')
          }
        }}>Add</Button>
      </DialogActions>
    </Dialog>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID #</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>First Name</TableCell>
            <TableCell align='center'>Last Name</TableCell>
            <TableCell align="center">
              <IconButton onClick={(event) => {
                setOpen(true);
              }}>
                  <PostAddIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user, index) => (
            <User key={user.user_id} index={index+1} data={user} users={props.users} setUsers={props.setUsers} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
export default React.memo(UsersDatatable);

function isValidEmail(text: string){
  return text.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}