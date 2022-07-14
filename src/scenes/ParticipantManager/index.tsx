import React from 'react';
import { Fade, Paper, Typography, useTheme } from '@mui/material';
import { drawerTransitionTime } from '../../navigation';
import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { useGetSelectedProjectID } from '../MyProjectsPage/store/selectors';
import {
    DeleteParticipantDialog,
    IDeleteConfirmationDialogData,
} from './DeleteParticiapantDialog';
import { IParticipantTableData, ParticipantTable } from './ParticipantTable';
import { useForm } from 'react-hook-form';
import request from 'config/request';

async function fetchParticipants(selectedProject: number) {
    return request({
        path: `/${ModelNamesEnum.Project_Participant}/list/${selectedProject}`,
        method: HttpMethod.GET,
    });
}

const UserEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const selectedProject = useGetSelectedProjectID();

    const { control, reset } = useForm<IParticipantTableData>({
        defaultValues: { participants: [] },
    });

    //fetch participants action
    React.useEffect(() => {
        if (selectedProject) {
            fetchParticipants(selectedProject).then((res) => {
                reset({ participants: res.data?.response || [] });
            });
        }
    }, [dispatch, selectedProject]);

    const [deleteDialogData, setDeleteDialogData] =
        React.useState<IDeleteConfirmationDialogData>({
            participant: null,
            open: false,
        });

    return (
        <>
            <DeleteParticipantDialog
                data={deleteDialogData}
                setData={setDeleteDialogData}
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
                        Project Participation
                    </Typography>
                    <Typography variant="h6" paragraph>
                        Here, you can view and edit project participations
                    </Typography>
                    <ParticipantTable
                        control={control}
                        setDeleteDialogData={setDeleteDialogData}
                    />
                </Paper>
            </Fade>
        </>
    );
});
export default UserEditor;
