import { Fade, Paper, Typography, useTheme } from "@mui/material";
import GridContainer from "../../components/common/GridContainer";
import { drawerTransitionTime } from "../../navigation";
import SearchBar from "../../components/common/SearchBar";
import ParticipantDatatable from "./ParticipantDatatable";
import React from "react";
import { defaultAPIAction } from "../../redux/common/actions";
import { useDispatch } from "react-redux";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import { SET_PARTICIPANT_LIST } from "./store/types";
import { useGetParticipantsList } from "./store/selectors";
import { IProjectParticipantData } from "../../models/ProjectParticipant";
import { useGetSelectedProject, useGetSelectedProjectData } from "../MyProjectsPage/store/selectors";

const UserEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const selectedProject = useGetSelectedProject();
    const selectedProjectData = useGetSelectedProjectData(selectedProject || 0);

    const participantList = useGetParticipantsList();
    React.useEffect(() => {
        if(selectedProject != null && selectedProjectData){
            defaultAPIAction({
                path: `/${ModelNamesEnum.Project_Participant}/list/${selectedProjectData.project_id}`,
                method: HttpMethod.GET,
            })(dispatch, SET_PARTICIPANT_LIST)    
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, selectedProject, selectedProjectData])

    const [participants, setParticipants] = React.useState<IProjectParticipantData[]>([]);
    React.useEffect(()=>{
        setParticipants(participantList.data || []);
        // console.log(participantList.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[participantList])

    
    return (
        <Fade in={true} timeout={drawerTransitionTime}>
            <Paper variant={'elevation'} elevation={5} style={{textAlign: 'center', padding: '1em', margin: '1em', backgroundColor: theme.palette.grey[200]}} >
                <Typography variant='h4' paragraph style={{display: 'inline-flex'}}>
                    {/* <AccountIcon fontSize={'large'} style={{marginRight: '0.5em'}}/>  */}
                    Project Participation
                </Typography>
                <Typography variant='h6' paragraph>Here, you can view and edit project participations</Typography>    
                <GridContainer lg={4} md={6} xs={12} justify={'flex-end'}>
                    <SearchBar/>
                </GridContainer>
                <ParticipantDatatable participants={participants} setParticipants={setParticipants}/>
            </Paper>
        </Fade>
    )
})
export default UserEditor;