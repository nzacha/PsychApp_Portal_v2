import { Box, Button, Fade, Paper, Typography, useTheme } from '@mui/material';
import GridContainer from '../../components/common/GridContainer';
import { drawerTransitionTime } from '../../navigation';
import SearchBar from '../../components/common/SearchBar';
import ProjectDatatable from './ProjectDatatable';
import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from '../../config/models';
import { defaultAPIAction } from '../../store/common/actions';
import { SET_PROJECT_LIST, SET_PROJECT_USER_LINKS } from './store/types';
import { SET_USER_LIST } from '../UserManager/store/types';
import { useGetProjectList } from './store/selectors';
import React, { Dispatch, useState } from 'react';
import { HttpMethod } from '../../config/httpMethods';
import { IUserData } from '../../models/Users';
import { useGetUserList } from '../UserManager/store/selectors';
import { CreateNewProjectDialog } from './CreateNewProjectDialog';

export function fetchProjects(dispatch: Dispatch<any>) {
    defaultAPIAction({
        path: `/${ModelNamesEnum.Project}`,
        method: HttpMethod.GET,
    })(dispatch, SET_PROJECT_LIST);
}

export function fetchLinks(dispatch: Dispatch<any>) {
    defaultAPIAction({
        path: `/${ModelNamesEnum.Project_User_Link}`,
        method: HttpMethod.GET,
    })(dispatch, SET_PROJECT_USER_LINKS);
}

const ProjectManager = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const projectList = useGetProjectList();
    React.useEffect(() => {
        defaultAPIAction({
            path: `/${ModelNamesEnum.User}`,
            method: HttpMethod.GET,
        })(dispatch, SET_USER_LIST);

        fetchProjects(dispatch);
        fetchLinks(dispatch);
    }, [dispatch]);

    const userList = useGetUserList();
    const users: IUserData[] = userList.data || [];
    const [open, setOpen] = useState(false);

    return (
        <>
            <CreateNewProjectDialog
                open={open}
                setOpen={setOpen}
                users={users}
            />
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
                        Project Editor
                    </Typography>
                    <Typography variant="h6" paragraph>
                        Here, you can edit all active projects
                    </Typography>
                    <Box display={'flex'} style={{ marginBottom: '1em' }}>
                        <Button
                            variant={'contained'}
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Add New Project
                        </Button>
                    </Box>
                    <GridContainer md={8} xs={10}>
                        <>
                            <GridContainer
                                lg={6}
                                md={9}
                                xs={12}
                                justify={'flex-end'}
                            >
                                <SearchBar />
                            </GridContainer>
                            <ProjectDatatable data={projectList.data || []} />
                        </>
                    </GridContainer>
                </Paper>
            </Fade>
        </>
    );
});
export default ProjectManager;
