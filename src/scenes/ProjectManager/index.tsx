import { Autocomplete, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControl, Icon, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import GridContainer from "../../components/common/GridContainer";
import { drawerTransitionTime } from "../../navigation";
import SearchBar from "../../components/common/SearchBar";
import ProjectDatatable from "./ProjectDatatable";

import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from '../../config/models';
import { defaultAPIAction } from '../../redux/common/actions';
import { SET_PROJECT_LIST, SET_PROJECT_USER_LINKS } from "./store/types";
import { SET_USER_LIST } from "../UserManager/store/types";
import { useGetProjectList } from "./store/selectors";
import React, { useState } from "react";
import { HttpMethod } from "../../config/httpMethods";
import { IFormItem, newFormItem } from "../../config/formItem";
import { IUserData } from "../../models/Users";
import { useGetUserList } from "../UserManager/store/selectors";
import { ControlledTextField } from "../../components/common/FormControl/ControlledTextField";


const ProjectManager = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();
    
    function fetchProjects(){
        defaultAPIAction({
            path: `/${ModelNamesEnum.Project}`,
            method: HttpMethod.GET,
        })(dispatch, SET_PROJECT_LIST)  
    }

    function fetchLinks(){
        defaultAPIAction({
            path: `/${ModelNamesEnum.Project_User_Link}`,
            method: HttpMethod.GET,
        })(dispatch, SET_PROJECT_USER_LINKS)   
    }

    const projectList = useGetProjectList();
    React.useEffect(() => {
        defaultAPIAction({
            path: `/${ModelNamesEnum.User}`,
            method: HttpMethod.GET,
        })(dispatch, SET_USER_LIST)    

        fetchProjects();
        fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    const userList = useGetUserList();
    const users: IUserData[] = userList.data || [];
    const [open, setOpen] = useState(false);

    const [newProjectName, setNewProjectName] = useState('New Project');
    const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
    const [newDownloadLink, setNewDownloadLink] = useState('http://www...');
    // console.log('Rendering Project Manager Page');
    return (
        <>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogContent style={{minWidth: '300px'}}>
                <Stack spacing={2}>
                    <DialogContentText>Project Details</DialogContentText>
                    <TextField 
                        label={'Project Name'} 
                        fullWidth 
                        value={newProjectName} 
                        onChange={event => {
                            setNewProjectName(event.target.value);
                        }} 
                    />
                    <Autocomplete
                        fullWidth
                        options={users}
                        onChange={(event, value) => setSelectedUser(value)}
                        getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Director"
                            />
                        )}
                    />
                    <TextField 
                        label={'Download Link'} 
                        fullWidth 
                        type={'url'}
                        value={newDownloadLink}
                        onChange={e => setNewDownloadLink(e.currentTarget.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={selectedUser == null} onClick={() => {
                    if(selectedUser) {
                        defaultAPIAction({
                            path: `/${ModelNamesEnum.Project}`,
                            method: HttpMethod.PUT,
                            body: {name: newProjectName, director_id: selectedUser.user_id, download_link: newDownloadLink},
                            onFinish: (s, r) => {
                                if(s) {
                                    setOpen(false);
                                    fetchProjects();
                                    fetchLinks();
                                }
                            }
                        })(dispatch, '')
                    }
                }}>Create</Button>
            </DialogActions>
        </Dialog>  
        <Fade in={true} timeout={drawerTransitionTime}>
            <Paper variant={'elevation'} elevation={5} style={{textAlign: 'center', padding: '1em', margin: '1em', backgroundColor: theme.palette.grey[200]}} >
                <Typography variant='h4' paragraph style={{display: 'inline-flex'}}>
                    {/* <AccountIcon fontSize={'large'} style={{marginRight: '0.5em'}}/>  */}
                    Project Editor
                </Typography>
                <Typography variant='h6' paragraph>Here, you can edit all active projects</Typography>
                <Box display={'flex'} style={{marginBottom: '1em'}}>
                    <Button variant={'contained'} onClick={() => {   
                        setOpen(true); 
                    }}>Add New Project</Button>
                </Box>
                <GridContainer md={8} xs={10}>
                    <>
                        <GridContainer lg={6} md={9} xs={12} justify={'flex-end'}>
                            <SearchBar/>
                        </GridContainer>
                        <ProjectDatatable data={projectList.data || []}/>
                    </>
                </GridContainer>
            </Paper>
        </Fade>
        </>
    )
})
export default ProjectManager;