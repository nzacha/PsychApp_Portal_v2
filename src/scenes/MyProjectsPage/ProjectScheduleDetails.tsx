import React, { useState } from 'react';
import {
    Box,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import GridLayout from '../../components/common/GridLayout';
import Title from '../../components/common/Title';
import { IFormItem, newFormItem } from '../../config/formItem';
import { HttpMethod } from '../../config/httpMethods';
import { ModelNamesEnum } from '../../config/models';
import { IProjectData } from '../../models/Project';
import { defaultAPIAction } from '../../store/common/actions';

interface IProjectScheduleDetails {
    data: IProjectData;
}
export function ProjectScheduleDetails(props: IProjectScheduleDetails) {
    const dispatch = useDispatch();

    const [studyLength, setStudyLength] = useState<IFormItem<number>>(
        newFormItem(props.data.study_length, false)
    );
    const [testsPerDay, setTestsPerDay] = useState<IFormItem<number>>(
        newFormItem(props.data.tests_per_day, false)
    );
    const [testsTimeInterval, setTestsTimeInterval] = useState<
        IFormItem<number>
    >(newFormItem(props.data.tests_time_interval, false));

    const [allowIndividualTimes, setAllowIndividualTimes] = useState<
        IFormItem<boolean>
    >(newFormItem(props.data.allow_individual_times, false));
    const [allowUserTermination, setAllowUserTermination] = useState<
        IFormItem<boolean>
    >(newFormItem(props.data.allow_user_termination, false));
    const [automaticTermination, setAutomaticTermination] = useState<
        IFormItem<boolean>
    >(newFormItem(props.data.automatic_termination, false));

    return (
        <Box style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <Title title={'Scheduler'} textAlign={'left'} />
            <GridLayout
                elements={[
                    {
                        id: 'col 1',
                        element: (
                            <Stack
                                spacing={2}
                                direction={'column'}
                                style={{ width: '100%' }}
                            >
                                <TextField
                                    type={'number'}
                                    label={'Study Length'}
                                    fullWidth
                                    value={studyLength.value}
                                    onChange={(event) => {
                                        setStudyLength(
                                            newFormItem(
                                                parseInt(
                                                    event.target.value || ''
                                                ),
                                                true
                                            )
                                        );
                                    }}
                                    onBlur={(event) => {
                                        defaultAPIAction({
                                            path: `/${ModelNamesEnum.Project}/${props.data.project_id}`,
                                            method: HttpMethod.PATCH,
                                            body: {
                                                study_length:
                                                    event.target.value,
                                            },
                                            onFinish: (success, res) => {
                                                setStudyLength(
                                                    newFormItem(
                                                        parseInt(
                                                            event.target
                                                                .value || ''
                                                        ),
                                                        false
                                                    )
                                                );
                                            },
                                        })(dispatch, '');
                                    }}
                                />
                                <TextField
                                    type={'number'}
                                    label={'Tests Per Day'}
                                    fullWidth
                                    value={testsPerDay.value}
                                    onChange={(event) => {
                                        setTestsPerDay(
                                            newFormItem(
                                                parseInt(
                                                    event.target.value || ''
                                                ),
                                                true
                                            )
                                        );
                                    }}
                                    onBlur={(event) => {
                                        defaultAPIAction({
                                            path: `/${ModelNamesEnum.Project}/${props.data.project_id}`,
                                            method: HttpMethod.PATCH,
                                            body: {
                                                tests_per_day:
                                                    event.target.value,
                                            },
                                            onFinish: (success, res) => {
                                                setTestsPerDay(
                                                    newFormItem(
                                                        parseInt(
                                                            event.target
                                                                .value || ''
                                                        ),
                                                        false
                                                    )
                                                );
                                            },
                                        })(dispatch, '');
                                    }}
                                />
                                <TextField
                                    type={'number'}
                                    label={'Test Time Interval'}
                                    fullWidth
                                    value={testsTimeInterval.value}
                                    onChange={(event) => {
                                        setTestsTimeInterval(
                                            newFormItem(
                                                parseInt(
                                                    event.target.value || ''
                                                ),
                                                true
                                            )
                                        );
                                    }}
                                    onBlur={(event) => {
                                        defaultAPIAction({
                                            path: `/${ModelNamesEnum.Project}/${props.data.project_id}`,
                                            method: HttpMethod.PATCH,
                                            body: {
                                                tests_time_interval:
                                                    event.target.value,
                                            },
                                            onFinish: (success, res) => {
                                                setTestsTimeInterval(
                                                    newFormItem(
                                                        parseInt(
                                                            event.target
                                                                .value || ''
                                                        ),
                                                        false
                                                    )
                                                );
                                            },
                                        })(dispatch, '');
                                    }}
                                />
                            </Stack>
                        ),
                        xs: 12,
                        md: 6,
                    },
                    {
                        id: 'col 2',
                        element: (
                            <Box
                                display={'flex'}
                                flex={1}
                                flexDirection={'column'}
                                style={{ marginLeft: '1em' }}
                            >
                                <Box
                                    display={'flex'}
                                    flex={1}
                                    style={{
                                        minHeight: 56,
                                        marginBottom: '1em',
                                    }}
                                    justifyContent={'center'}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={
                                                    allowIndividualTimes.value
                                                }
                                                value={
                                                    allowIndividualTimes.value
                                                }
                                                onChange={(event) => {
                                                    setAllowIndividualTimes(
                                                        newFormItem(
                                                            event.target
                                                                .checked,
                                                            true
                                                        )
                                                    );
                                                }}
                                                onBlur={(event) => {
                                                    defaultAPIAction({
                                                        path: `/${ModelNamesEnum.Project}/${props.data.project_id}`,
                                                        method: HttpMethod.PATCH,
                                                        body: {
                                                            allow_individual_times:
                                                                event.target
                                                                    .value ===
                                                                'true'
                                                                    ? true
                                                                    : false,
                                                        },
                                                        onFinish: (
                                                            success,
                                                            res
                                                        ) => {
                                                            if (success) {
                                                                const data: IProjectData =
                                                                    res.data
                                                                        .response;
                                                                setAllowIndividualTimes(
                                                                    newFormItem(
                                                                        data.allow_individual_times,
                                                                        false
                                                                    )
                                                                );
                                                            }
                                                        },
                                                    })(dispatch, '');
                                                }}
                                            />
                                        }
                                        label="Allow Individual Times"
                                    />
                                </Box>
                                <Box
                                    display={'flex'}
                                    flex={1}
                                    style={{
                                        minHeight: 56,
                                        marginBottom: '1em',
                                    }}
                                    justifyContent={'center'}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={
                                                    allowUserTermination.value
                                                }
                                                value={
                                                    allowUserTermination.value
                                                }
                                                onChange={(event) => {
                                                    setAllowUserTermination(
                                                        newFormItem(
                                                            event.target
                                                                .checked,
                                                            true
                                                        )
                                                    );
                                                }}
                                                onBlur={(event) => {
                                                    defaultAPIAction({
                                                        path: `/${ModelNamesEnum.Project}/${props.data.project_id}`,
                                                        method: HttpMethod.PATCH,
                                                        body: {
                                                            allow_user_termination:
                                                                event.target
                                                                    .value ===
                                                                'true'
                                                                    ? true
                                                                    : false,
                                                        },
                                                        onFinish: (
                                                            success,
                                                            res
                                                        ) => {
                                                            const data: IProjectData =
                                                                res.data
                                                                    .response;
                                                            setAllowUserTermination(
                                                                newFormItem(
                                                                    data.allow_user_termination,
                                                                    false
                                                                )
                                                            );
                                                        },
                                                    })(dispatch, '');
                                                }}
                                            />
                                        }
                                        label="Allow User Termination"
                                    />
                                </Box>
                                <Box
                                    display={'flex'}
                                    flex={1}
                                    style={{ minHeight: 56 }}
                                    justifyContent={'center'}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={
                                                    automaticTermination.value
                                                }
                                                value={
                                                    automaticTermination.value
                                                }
                                                onChange={(event) => {
                                                    setAutomaticTermination(
                                                        newFormItem(
                                                            event.target
                                                                .checked,
                                                            true
                                                        )
                                                    );
                                                }}
                                                onBlur={(event) => {
                                                    defaultAPIAction({
                                                        path: `/${ModelNamesEnum.Project}/${props.data.project_id}`,
                                                        method: HttpMethod.PATCH,
                                                        body: {
                                                            automatic_termination:
                                                                event.target
                                                                    .value ===
                                                                'true'
                                                                    ? true
                                                                    : false,
                                                        },
                                                        onFinish: (
                                                            success,
                                                            res
                                                        ) => {
                                                            const data: IProjectData =
                                                                res.data
                                                                    .response;
                                                            setAutomaticTermination(
                                                                newFormItem(
                                                                    data.automatic_termination,
                                                                    false
                                                                )
                                                            );
                                                        },
                                                    })(dispatch, '');
                                                }}
                                            />
                                        }
                                        label="Automatic Termination"
                                    />
                                </Box>
                            </Box>
                        ),
                        xs: 12,
                        md: 6,
                    },
                ]}
            />
        </Box>
    );
}
