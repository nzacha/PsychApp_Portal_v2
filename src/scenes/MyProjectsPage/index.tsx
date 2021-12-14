import { Fade, Paper, Typography, useTheme } from "@mui/material";
import GridContainer from "../../components/common/GridContainer";
import { drawerTransitionTime } from "../../navigation";
import SearchBar from "../../components/common/SearchBar";
import ProjectDatatable from "./ProjectDatatable";

import React from "react";
import { useGetProjectList } from "./store/selectors";
import { defaultAPIAction } from "../../redux/common/actions";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import { SET_PROJECT_LIST } from "./store/types";
import { useDispatch } from "react-redux";

const ProjectManager = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const projectList = useGetProjectList();

    React.useEffect(() => {
        defaultAPIAction({
            path: `/${ModelNamesEnum.Project}/list/${1}`,
            method: HttpMethod.GET,
        })(dispatch, SET_PROJECT_LIST)  
    }, [dispatch])

    return (
        <Fade in={true} timeout={drawerTransitionTime}>
            <Paper variant={'elevation'} elevation={5} style={{textAlign: 'center', padding: '1em', margin: '1em', backgroundColor: theme.palette.grey[200]}} >
                <Typography variant='h4' paragraph style={{display: 'inline-flex'}}>
                    {/* <AccountIcon fontSize={'large'} style={{marginRight: '0.5em'}}/>  */}
                    My Projects
                </Typography>
                <Typography variant='h6' paragraph>Here, you can edit your projects</Typography>
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
    )
})
export default ProjectManager;