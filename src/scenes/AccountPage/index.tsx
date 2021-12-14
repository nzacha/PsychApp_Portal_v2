import { Fade, Paper, TextField, Typography, useTheme } from "@mui/material";
import { drawerTransitionTime } from "../../navigation";
import { useGetUserList } from "./store/selectors";
import React from "react";
import { SET_USER_LIST } from "./store/types";
import { defaultAPIAction } from "../../redux/common/actions";
import { useDispatch } from "react-redux";
import { IUserData } from "../../models/Users";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import GridLayout from "../../components/common/GridLayout";
import AccountIcon from '@mui/icons-material/AccountCircle';

const UserEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const userList = useGetUserList();
    // React.useEffect(() => {
    //     defaultAPIAction({
    //         path: `/${ModelNamesEnum.User}/list/${1}`,
    //         method: HttpMethod.GET,
    //     })(dispatch, SET_USER_LIST)    
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[dispatch])

    const [users, setUsers] = React.useState<IUserData[]>([]);
    React.useEffect(()=>{
        setUsers(userList.data || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userList])

    
    return (
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
                                <TextField label={'Email'} fullWidth/>
                            ),
                            xs: 6
                        },{
                            id: 'phone',
                            element: (
                                <TextField label={'Phone'} fullWidth/>
                            ),
                            xs: 6
                        },{
                            id: 'name',
                            element: (
                                <TextField label={'Name'} fullWidth/>
                            ),
                            xs: 6
                        },{
                            id: 'last_name',
                            element: (
                                <TextField label={'Last Name'} fullWidth/>
                            ),
                            xs: 6
                        }
                    ]}
                />
            </Paper>
        </Fade>
    )
})
export default UserEditor;