import { Fade, Paper, Slider, Typography, useTheme } from '@mui/material';
import { drawerTransitionTime } from '../../navigation';
import { useGetUserList } from './store/selectors';
import React, { useState } from 'react';
import { SET_USER_LIST } from './store/types';
import { defaultAPIAction } from '../../store/common/actions';
import { useDispatch } from 'react-redux';
import { IUserData } from '../../models/Users';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import GridLayout from '../../components/common/GridLayout';
import SettingsIcon from '@mui/icons-material/Settings';

import Stack from '@mui/material/Stack';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const UserEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const userList = useGetUserList();
    // React.useEffect(() => {
    //     defaultAPIAction({
    //         path: `/${ModelNamesEnum.User}/list/${1}`,
    //         method: HttpMethod.GET,
    //     })(dispatch, SET_USER_LIST)
    // },[dispatch])

    const [users, setUsers] = React.useState<IUserData[]>([]);
    React.useEffect(() => {
        setUsers(userList.data || []);
    }, [userList]);
    const [volume, setVolume] = useState(50);

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
                    <SettingsIcon
                        fontSize={'large'}
                        style={{ marginRight: '0.5em' }}
                    />
                    Settings Page
                </Typography>
                <Typography variant="h6" paragraph>
                    Here, you can edit your account preferences
                </Typography>
                <GridLayout
                    justify={'center'}
                    lg={8}
                    md={10}
                    xs={12}
                    style={{ margin: 'auto' }}
                    elements={[
                        {
                            id: 'email',
                            element: (
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ mb: 1 }}
                                    alignItems="center"
                                    style={{ width: '100%' }}
                                >
                                    <VolumeDown />
                                    <Slider
                                        value={volume}
                                        onChange={(event, newValue) =>
                                            setVolume(newValue as number)
                                        }
                                    />
                                    <VolumeUp />
                                </Stack>
                            ),
                            xs: 6,
                        },
                    ]}
                />
            </Paper>
        </Fade>
    );
});
export default UserEditor;
