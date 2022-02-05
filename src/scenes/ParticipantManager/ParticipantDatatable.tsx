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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, TextField, ToggleButton, Typography, useTheme } from '@mui/material';
import DeactivateIcon from '@mui/icons-material/DoNotDisturbOn';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionStatus, defaultAPIAction } from '../../redux/common/actions';
import { DEACTIVATE_PARTICIPANT, DELETE_PARTICIPANT, INSERT_PARTICIPANT } from './store/types';
import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { IProjectParticipantData } from '../../models/ProjectParticipant';
import { useGetSelectedProjectID} from "../MyProjectsPage/store/selectors";
import { IFormItem, newFormItem } from '../../config/formItem';

type IDeleteConfirmationDialogData = {
  participant: IProjectParticipantData | null;
  onConfirm?: () => void;
  open: boolean;
};
interface IDeleteConfirmationDialogProps{
  data: IDeleteConfirmationDialogData;
  setData: React.Dispatch<React.SetStateAction<IDeleteConfirmationDialogData>>;
}
function DeleteConfirmationDialog({data, setData}: IDeleteConfirmationDialogProps) {
  return (
    <div>
      <Dialog
        open={data.open}
        onClose={() => setData({participant: null, open: false})}
      >
        <DialogTitle>
          {`Delete participant`}
        </DialogTitle>
        <DialogContent>
          {`Are you sure you want to delete participant:`}
          <br/> 
          <ul>
            <li>{`code: ${data.participant?.authentication_code || ''}`}</li>
            {data.participant?.name ? (
              <li>
                {`alias: ${data.participant.name}`}
              </li>
            ): ('')}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button color={'warning'} variant={'contained'} onClick={() => {setData({participant: null, open: false})}}>Cancel</Button>
          <Button color={'primary'} variant={'contained'} onClick={() => {setData({participant: null, open: false}); if(data.onConfirm) data.onConfirm();}} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


interface IParticipantProps{
  data: IProjectParticipantData;
  participants: IProjectParticipantData[];
  setParticipants: React.Dispatch<any>;
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<IDeleteConfirmationDialogData>>;
}
function Participant(props: IParticipantProps) {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const { data } = props;

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<IFormItem<string>>(newFormItem('', false));

  React.useEffect(() => {
    if(data)
      setName(newFormItem(data.name || '-', false));
  }, [data])

  // console.log(data);
  return (
    <React.Fragment>
      <TableRow hover={data.is_active} style={{flex: 1, backgroundColor: data.is_active ? undefined : theme.palette.action.disabledBackground}}>
        <TableCell align="left" style={{width: '5%'}}>
          {data.participant_id}
        </TableCell>
        <TableCell align="center" style={{width: '40%'}}>
          <TextField 
            label={'Name'}
            fullWidth 
            value={name.value}
            error={Boolean(name.error)}
            helperText={name.error}
            onChange={(e) => {
              if(e.currentTarget.value != name.value)
                setName(newFormItem(e.currentTarget.value, true))
            }}
            onBlur={(e) => {
              if(name.hasChanged){
                defaultAPIAction({
                  path: `/${ModelNamesEnum.Project_Participant}/${props.data.participant_id}`,
                  method: HttpMethod.PATCH,
                  body: {
                    name: name.value
                  },
                  onFinish: (success: boolean, payload) => {
                    if(success){
                      setName(newFormItem(payload.data.response.name, false, ActionStatus.Success))
                    }else{
                      setName(newFormItem(name.value, false, ActionStatus.Failure, payload.message))
                    }
                  }
                })(dispatch, '')
              }
            }}
          />
          {data.deactivation_reason && <Typography variant={'subtitle2'}>{data.deactivation_reason}</Typography>}
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
          <TextField 
            label={'Progress'}
            InputProps={{
              readOnly: true,
            }}
            fullWidth 
            value={props.data.progress}
            inputProps={{style: { textAlign: 'center' }}}
          />    
        </TableCell>
        <TableCell align="center" style={{width: '10%'}}>
          <Box>
            <IconButton onClick={(event) => {
                defaultAPIAction({
                    path: `/${ModelNamesEnum.Project_Participant}/status/${props.data.participant_id}`,
                    method: HttpMethod.POST,
                    body: {
                      value: !data.is_active,
                      reasoning: ''
                    },
                    onFinish: (success: boolean, payload) => {
                      if(success){
                        const newParticipant = payload.data.response;
                        const newParticipants = props.participants.slice().map(item => {
                          if(item.participant_id == newParticipant.participant_id){
                            return newParticipant;
                          }else{
                            return item;
                          }
                        })
                        props.setParticipants(newParticipants);
                      }
                    }
                })(dispatch, DEACTIVATE_PARTICIPANT)
            }}>
                <DeactivateIcon/>
            </IconButton>
            <IconButton onClick={(event) => {
                props.setDeleteConfirmation({participant: props.data, open: true, onConfirm: () => {
                  defaultAPIAction({
                    path: `/${ModelNamesEnum.Project_Participant}/${props.data.participant_id}`,
                    method: HttpMethod.DELETE,
                    onFinish: (success: boolean, payload) => {
                        if(success){
                            let newParticipants = props.participants.slice();
                            newParticipants = newParticipants.filter(item => item.participant_id !== props.data.participant_id)
                            props.setParticipants(newParticipants);
                        }
                    }
                })(dispatch, DELETE_PARTICIPANT)
                }})
            }}>
                <DeleteIcon/>
            </IconButton>
          </Box>
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
  
  const selectedProject = useGetSelectedProjectID();
  const [data, setData] = React.useState<IDeleteConfirmationDialogData>({participant: null, open: false});
  return (
    <TableContainer component={Paper}>
      <DeleteConfirmationDialog data={data} setData={setData}/>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID #</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Login Code</TableCell>
            <TableCell align='center'>Questions Answered</TableCell>
            <TableCell align="center">
              <IconButton onClick={(event) => {
                  if(selectedProject)
                    defaultAPIAction({
                        path: `/${ModelNamesEnum.Project_Participant}/${selectedProject}`,
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
              setParticipants={props.setParticipants}
              setDeleteConfirmation={setData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default React.memo(ParticipantsDatatable);