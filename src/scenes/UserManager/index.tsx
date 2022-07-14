import { Fade, Paper, Typography, useTheme } from '@mui/material';
import GridContainer from '../../components/common/GridContainer';
import { drawerTransitionTime } from '../../navigation';
import SearchBar from '../../components/common/SearchBar';
import UsersDatatable, { IUserTableData } from './UsersDatatable';
import React from 'react';
import { ModelNamesEnum } from '../../config/models';
import { useForm } from 'react-hook-form';
import request from 'config/request';
import { HttpMethod } from 'config/httpMethods';
import { useDispatch } from 'react-redux';

async function fetchUsers() {
    return request({
        path: `/${ModelNamesEnum.User}`,
        method: HttpMethod.GET,
    });
}

const UserEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { control, reset } = useForm<IUserTableData>({
        defaultValues: { users: [] },
    });

    React.useEffect(() => {
        fetchUsers().then((res) => {
            reset({ users: res.data?.response || [] });
        });
    }, [dispatch]);

    return (
        <Fade in={true} timeout={drawerTransitionTime}>
            <Paper
                variant={'elevation'}
                elevation={5}
                style={{
                    textAlign: 'center',
                    padding: '1em',
                    margin: '1em',
                    backgroundColor: theme.palette.grey[200],
                }}
            >
                <Typography
                    variant="h4"
                    paragraph
                    style={{ display: 'inline-flex' }}
                >
                    {/* <AccountIcon fontSize={'large'} style={{marginRight: '0.5em'}}/>  */}
                    User Management
                </Typography>
                <Typography variant="h6" paragraph>
                    Here, you can edit user accounts
                </Typography>
                <GridContainer lg={4} md={6} xs={12} justify={'flex-end'}>
                    <SearchBar />
                </GridContainer>
                <UsersDatatable control={control} />
            </Paper>
        </Fade>
    );
});
export default UserEditor;
