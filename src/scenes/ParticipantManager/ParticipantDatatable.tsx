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
import { IconButton, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { defaultAPIAction } from '../../redux/common/actions';
import { DELETE_PARTICIPANT, INSERT_PARTICIPANT } from './store/types';
import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { IProjectParticipantData } from '../../models/ProjectParticipant';
import { useGetSelectedProject, useGetSelectedProjectData } from "../MyProjectsPage/store/selectors";

interface IParticipantProps{
  data: IProjectParticipantData;
  participants: IProjectParticipantData[];
  setParticipants: React.Dispatch<any>;
}
function Participant(props: IParticipantProps) {
  const dispatch = useDispatch();
  const { data } = props;

  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <React.Fragment>
      <TableRow style={{flex: 1}}>
        <TableCell align="left" style={{width: '5%'}}>
          {data.participant_id}
        </TableCell>
        <TableCell align="center" style={{width: '40%'}}>
          <TextField 
            label={'Name'}
            InputProps={{
              readOnly: true,
            }}
            fullWidth 
            value={'-'}
          />
        </TableCell>
        <TableCell align="center" style={{width: '20%'}}>
          <TextField 
            label={'Code'}
            InputProps={{
              readOnly: true,
            }}
            fullWidth 
            value={props.data.authentication_code}
            inputProps={{style: { textAlign: 'center' }}}
          />
        </TableCell>
        <TableCell align="center" style={{width: '10%'}}>
          <IconButton onClick={(event) => {
              defaultAPIAction({
                  path: `/${ModelNamesEnum.Project_Participant}/${props.data.participant_id}`,
                  method: HttpMethod.DELETE,
                  onFinish: (success: boolean, payload) => {
                      if(success){
                          // console.log(data)
                          let newParticipants = props.participants.slice();
                          newParticipants = newParticipants.filter(item => item.participant_id !== props.data.participant_id)
                          props.setParticipants(newParticipants);
                          // props.onRefresh();
                      }
                  }
              })(dispatch, DELETE_PARTICIPANT)
          }}>
              <DeleteIcon/>
          </IconButton>
      </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface IParticipantsDatatableProps{
  participants: IProjectParticipantData[];
  setParticipants: React.Dispatch<any>;
}
export function ParticipantsDatatable(props: IParticipantsDatatableProps) {
  // console.log(props.data);
  const dispatch = useDispatch<any>();
  
  const selectedProject = useGetSelectedProject();
  const selectedProjectData = useGetSelectedProjectData(selectedProject || 0);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID #</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Login Code</TableCell>
            <TableCell align="center">
              <IconButton onClick={(event) => {
                  if(selectedProjectData)
                    defaultAPIAction({
                        path: `/${ModelNamesEnum.Project_Participant}/${selectedProjectData.project_id}`,
                        method: HttpMethod.PUT,
                        onFinish: (success: boolean, result) => {
                            console.log(result)
                            if(success && result?.data?.response){
                                // console.log(result)
                                let newParticipants = props.participants.slice();
                                newParticipants.push(result.data.response);
                                props.setParticipants(newParticipants);
                                // props.onRefresh();
                            } 
                        }
                    })(dispatch, INSERT_PARTICIPANT)
              }}>
                  <PostAddIcon/>
              </IconButton>
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.participants.map((participant) => (
            <Participant 
              key={participant.participant_id} 
              data={participant} 
              participants={props.participants} 
              setParticipants={props.setParticipants} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default React.memo(ParticipantsDatatable);