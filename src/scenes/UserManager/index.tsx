import { Fade, Paper, Typography, useTheme } from "@mui/material";
import GridContainer from "../../components/common/GridContainer";
import { drawerTransitionTime } from "../../navigation";
import SearchBar from "../../components/common/SearchBar";
import UsersDatatable from "./UsersDatatable";
import { useGetUserList } from "./store/selectors";
import React from "react";
import { SET_USER_LIST } from "./store/types";
import { defaultAPIAction } from "../../redux/common/actions";
import { useDispatch } from "react-redux";
import { IUserData } from "../../models/Users";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";

const UserEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const userList = useGetUserList();
    React.useEffect(() => {
        defaultAPIAction({
            path: `/${ModelNamesEnum.User}`,
            method: HttpMethod.GET,
        })(dispatch, SET_USER_LIST)    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    const [users, setUsers] = React.useState<IUserData[]>([]);
    React.useEffect(()=>{
        setUsers(userList.data || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userList])

    return (
        <Fade in={true} timeout={drawerTransitionTime}>
            <Paper variant={'elevation'} elevation={5} style={{textAlign: 'center', padding: '1em', margin: '1em', backgroundColor: theme.palette.grey[200]}} >
                <Typography variant='h4' paragraph style={{display: 'inline-flex'}}>
                    {/* <AccountIcon fontSize={'large'} style={{marginRight: '0.5em'}}/>  */}
                    User Management
                </Typography>
                <Typography variant='h6' paragraph>Here, you can edit user accounts</Typography>
                <GridContainer lg={4} md={6} xs={12} justify={'flex-end'}>
                    <SearchBar/>
                </GridContainer>
                <UsersDatatable users={users} setUsers={setUsers}/>
            </Paper>
        </Fade>
    )
})
export default UserEditor;