import * as React from 'react';
import { Box, Fade, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { IProjectParticipantData } from '../../models/ProjectParticipant';
import { IDeleteConfirmationDialogData } from './DeleteParticiapantDialog';
import DeactivateIcon from '@mui/icons-material/DoNotDisturbOn';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetSelectedProjectID } from '../MyProjectsPage/store/selectors';
import { useFieldArray, UseFieldArrayReturn } from 'react-hook-form';
import {
    ControlledResponsiveTable,
    ITableColumnProps,
    PlainTextColumnFunction,
} from 'components/common/FormControl/Table';
import { Control } from 'react-hook-form';
import { drawerTransitionTime } from 'navigation';
import { UncontrolledTextField } from 'components/common/FormControl/Textfield/UncontrolledTextField';
import request from 'config/request';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { ResponsiveButton } from 'components/common/FormControl/Button';

async function insertParticipant(selectedProject: number) {
    return request({
        path: `/${ModelNamesEnum.Project_Participant}/${selectedProject}`,
        method: HttpMethod.PUT,
    });
}
interface InsertParticipantButtonProps {
    selectedProject: number | null;
    append: UseFieldArrayReturn['append'];
}
function InsertParticipantButton({ selectedProject, append }: InsertParticipantButtonProps) {
    return (
        <Tooltip title={'Insert New Participant'} placement={'top'}>
            <span>
                <ResponsiveButton
                    title={'Add New'}
                    Icon={<PostAddIcon />}
                    disabled={!selectedProject}
                    onClick={() => {
                        if (selectedProject) {
                            insertParticipant(selectedProject).then((res) => {
                                if (res.data?.response) append(res.data.response);
                            });
                        }
                    }}
                />
            </span>
        </Tooltip>
    );
}
async function editParticipant(participant_id: number, body: {}) {
    return request({
        path: `/${ModelNamesEnum.Project_Participant}/${participant_id}`,
        method: HttpMethod.PATCH,
        body: body,
    });
}

async function changeParticipantStatus(participant_id: number, value: boolean, reasoning: string) {
    return request({
        path: `/${ModelNamesEnum.Project_Participant}/status/${participant_id}`,
        method: HttpMethod.POST,
        body: {
            value: value,
            reasoning: reasoning,
        },
    });
}

async function deleteParticipant(participant_id: number) {
    return request({
        path: `/${ModelNamesEnum.Project_Participant}/${participant_id}`,
        method: HttpMethod.DELETE,
    });
}

function getTableColumns(
    selectedProject: number | null,
    setDeleteDialogData: React.Dispatch<React.SetStateAction<IDeleteConfirmationDialogData>>,
    isSmallScreen: boolean,
    append: UseFieldArrayReturn['append'],
    edit: UseFieldArrayReturn['update'],
    remove: UseFieldArrayReturn['remove']
): ITableColumnProps<any>[] {
    return [
        {
            label: <>ID #</>,
            name: 'participant_id',
            columnStyle: { width: '10%', textAlign: 'start' },
            renderFunction: PlainTextColumnFunction,
        },
        {
            label: <>Name</>,
            name: 'name',
            columnStyle: { width: '40%', textAlign: 'center' },
            renderFunction: (value: string, rowIndex: number, array) => (
                <UncontrolledTextField
                    initialValue={value}
                    label={<>name</>}
                    onChange={(e) => {}}
                    onBlur={(e) => {
                        editParticipant(array[rowIndex].participant_id, {
                            name: e.currentTarget.value,
                        }).then((res) => {
                            if (res.data?.response) {
                                edit(rowIndex, res.data.response);
                            }
                        });
                    }}
                />
            ),
        },
        {
            label: <>Login Code</>,
            name: 'authentication_code',
            columnStyle: { width: '15%', textAlign: 'center' },
            renderFunction: PlainTextColumnFunction,
        },
        {
            label: <>Questions Answered</>,
            name: 'progress',
            columnStyle: { width: '15%', textAlign: 'center' },
            renderFunction: PlainTextColumnFunction,
        },
        {
            label: (
                <>{!isSmallScreen && <InsertParticipantButton selectedProject={selectedProject} append={append} />}</>
            ),
            name: undefined,
            align: 'right',
            columnStyle: {
                width: '20%',
            },
            renderFunction: (value, rowIndex, array) => (
                <Box display={'flex'} justifyContent={isSmallScreen ? 'center' : 'end'}>
                    <Tooltip title={'Deactivate Participant'} placement={'top'}>
                        <span>
                            <ResponsiveButton
                                Icon={<DeactivateIcon />}
                                // color={'inherit'}
                                disabled={!selectedProject}
                                onClick={(event) => {
                                    const participant = array[rowIndex];
                                    changeParticipantStatus(
                                        participant.participant_id,
                                        !participant.is_active,
                                        ''
                                    ).then((res) => {
                                        if (res.data?.response) edit(rowIndex, res.data.response);
                                    });
                                }}
                            />
                        </span>
                    </Tooltip>

                    <Tooltip title={'Delete Participant'} placement={'top'}>
                        <span>
                            <ResponsiveButton
                                Icon={<DeleteIcon />}
                                color={'error'}
                                disabled={!selectedProject}
                                onClick={(event) => {
                                    const participant = array[rowIndex];
                                    setDeleteDialogData({
                                        participant: participant,
                                        open: true,
                                        onConfirm: () => {
                                            deleteParticipant(participant.participant_id).then((res) => {
                                                if (res.data?.response) remove(rowIndex);
                                            });
                                        },
                                    });
                                }}
                            />
                        </span>
                    </Tooltip>
                </Box>
            ),
        },
    ];
}

export interface IParticipantTableData {
    participants: IProjectParticipantData[];
}
interface IParticipantsDatatableProps {
    control: Control<IParticipantTableData>;
    setDeleteDialogData: React.Dispatch<React.SetStateAction<IDeleteConfirmationDialogData>>;
}
export function ParticipantTable({ control, setDeleteDialogData, ...props }: IParticipantsDatatableProps) {
    const theme = useTheme();

    const selectedProject = useGetSelectedProjectID();
    const { isSmallScreen } = useWindowDimensions();
    const fieldArrayProps = useFieldArray<IParticipantTableData>({
        control: control,
        name: 'participants',
    });

    return (
        <Fade in={true} timeout={drawerTransitionTime}>
            <Box>
                {isSmallScreen && (
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        style={{ marginBottom: '0.5em' }}
                    >
                        <InsertParticipantButton selectedProject={selectedProject} append={fieldArrayProps.append} />
                    </Stack>
                )}
                <ControlledResponsiveTable
                    fieldArrayProps={fieldArrayProps}
                    columns={getTableColumns(
                        selectedProject,
                        setDeleteDialogData,
                        isSmallScreen,
                        fieldArrayProps.append,
                        fieldArrayProps.update,
                        fieldArrayProps.remove
                    )}
                    getRowStyle={(rowIndex, array) => {
                        return {
                            textAlign: 'center',
                            backgroundColor: array[rowIndex].is_active
                                ? undefined
                                : theme.palette.action.disabledBackground,
                        };
                    }}
                    headerStyle={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                    stickyHeader
                />
            </Box>
        </Fade>
    );
}
