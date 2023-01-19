import * as React from 'react';
import { Box, IconButton, ListItemText, MenuItem, Select, Stack, Switch } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IQuizQuestionData, QuizQuestionAlignment, QuizQuestionType } from '../../models/QuizQuestion';
import {
    ControlledResponsiveTable,
    ITableColumnProps,
    UncontrolledResponsiveTable,
} from 'components/common/FormControl/Table';
import { Control, useFieldArray, UseFieldArrayReturn, useForm, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ResponsiveButton } from 'components/common/FormControl/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import useWindowDimensions from 'hooks/useWindowDimensions';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    insertQuestion,
    insertQuestionOption,
    removeQuestion,
    removeQuestionOption,
    updateQuestion,
    updateQuestionOption,
} from './config';
import AddIcon from '@mui/icons-material/Add';
import _ from 'lodash';
import { UncontrolledTextField } from 'components/common/FormControl/Textfield/UncontrolledTextField';
import { ConfirmationDialog } from 'components/common/Dialogs/ConfirmationDialog';
import { useState } from 'react';
import { IQuizOptionData } from 'models/QuizOption';

interface IQuestionTableFormData {
    questions: IQuizQuestionData[];
    collapseStates: boolean[];
}

interface IQuestionsTableProps {
    section_id: number;
    questions: IQuizQuestionData[];
}
export function QuizSection({ section_id, questions }: IQuestionsTableProps) {
    const { isSmallScreen, isMediumScreen, isLargeScreen } = useWindowDimensions();

    const { control, reset, watch, setValue } = useForm<IQuestionTableFormData>({
        defaultValues: {
            questions: [],
            collapseStates: [],
        },
    });
    const questionFieldArrayProps = useFieldArray({
        control: control,
        name: 'questions',
    });

    React.useEffect(() => {
        reset({
            questions: questions,
            collapseStates: new Array(questions.length).fill(false),
        });
    }, [questions, reset]);

    const [confirmationAction, setConfirmationAction] = useState<(() => void) | null>(null);

    return (
        <>
            <ConfirmationDialog
                open={confirmationAction != null}
                onClose={() => setConfirmationAction(null)}
                onConfirm={() => confirmationAction && confirmationAction()}
                title={'Confirm Delete'}
            />
            {isSmallScreen && (
                <Box style={{ display: 'flex', flex: 1, justifyContent: 'center', marginBottom: '1em' }}>
                    <ResponsiveButton
                        title={'Insert New Question'}
                        Icon={<PostAddIcon />}
                        onClick={(event) => {
                            insertQuestion(section_id).then((res) => {
                                if (res.data?.response) questionFieldArrayProps.append(res.data.response);
                            });
                        }}
                    />
                </Box>
            )}
            <ControlledResponsiveTable
                fieldArrayProps={questionFieldArrayProps}
                columns={getTableColumns(
                    section_id,
                    isSmallScreen,
                    isMediumScreen,
                    isLargeScreen,
                    setConfirmationAction,
                    watch,
                    setValue,
                    questionFieldArrayProps.append,
                    questionFieldArrayProps.update,
                    questionFieldArrayProps.remove
                )}
                renderCollapsable={(row, rowIndex, data) => (
                    <Stack style={{ width: '100%' }}>
                        {!isSmallScreen && !isLargeScreen && (
                            <UncontrolledResponsiveTable
                                data={[data[rowIndex]]}
                                columns={getAdditionalAttributesColumns(questionFieldArrayProps.update)}
                                stickyHeader
                                hidePagination
                                hideScroll
                                useCardView={false}
                            />
                        )}
                        {isSmallScreen && (
                            <Box style={{ display: ' flex', justifyContent: 'center', marginTop: '1em' }}>
                                <ResponsiveButton
                                    title={'Insert New Option'}
                                    Icon={<AddIcon />}
                                    onClick={() => {
                                        insertQuestionOption(data[rowIndex].question_id).then((res) => {
                                            if (res.data?.response) {
                                                const question = data[rowIndex];
                                                _.set(question, 'question_options', [
                                                    ...(question.question_options || []),
                                                    res.data.response,
                                                ]);
                                                questionFieldArrayProps.update(rowIndex, question);
                                            }
                                        });
                                    }}
                                />
                            </Box>
                        )}
                        <UncontrolledResponsiveTable
                            data={(data[rowIndex].question_options || []).sort(
                                (el1: Partial<IQuizOptionData>, el2: Partial<IQuizOptionData>) =>
                                    (el1?.question_option_id || 0) - (el2?.question_option_id || 0)
                            )}
                            columns={getOptionsTableColumns(
                                isSmallScreen,
                                watch('questions')[rowIndex].question_id,
                                rowIndex,
                                questionFieldArrayProps.fields,
                                questionFieldArrayProps.update
                            )}
                            stickyHeader
                            hidePagination
                            hideScroll
                            // useCardView={false}
                        />
                    </Stack>
                )}
                collapsableStyle={{ paddingLeft: '1em', paddingRight: '2em' }}
                getCollapseStatus={(rowIndex) => watch('collapseStates')[rowIndex]}
                style={{ width: '100%' }}
                hideScroll
                useCardCollapse
                renderTitle={(rowIndex) => <>Question {rowIndex + 1}</>}
            />
        </>
    );
}

function getAdditionalAttributesColumns(
    update: UseFieldArrayReturn<IQuestionTableFormData['questions']>['update']
): ITableColumnProps<any>[] {
    return [
        {
            label: <>Alignment</>,
            name: 'alignment',
            columnStyle: {
                width: '15%',
                textAlign: 'center',
            },
            renderFunction: (value, rowIndex, array) => (
                <Select
                    fullWidth
                    disabled={array[rowIndex].type == QuizQuestionType.SLIDER}
                    value={value}
                    onChange={(e) => {
                        updateQuestion(array[rowIndex].question_id, {
                            ...array[rowIndex],
                            alignment: e.target.value,
                        }).then((res) => {
                            if (res.data?.response) {
                                update(rowIndex, { ...array[rowIndex], ...res.data.response });
                            }
                        });
                    }}
                    style={{ height: '56px', boxSizing: 'border-box' }}
                >
                    <MenuItem value={QuizQuestionAlignment.HORIZONTAL}>
                        <ListItemText primary={QuizQuestionAlignment.HORIZONTAL} />
                    </MenuItem>
                    <MenuItem value={QuizQuestionAlignment.VERTICAL}>
                        <ListItemText primary={QuizQuestionAlignment.VERTICAL} />
                    </MenuItem>
                </Select>
            ),
        },
        {
            label: <>Request Reason</>,
            name: 'request_reason',
            columnStyle: {
                width: '10%',
                textAlign: 'center',
            },
            renderFunction: (value: any, rowIndex, array) => (
                <Switch
                    disabled={array[rowIndex].type == QuizQuestionType.SLIDER}
                    checked={value}
                    onChange={(e) => {
                        updateQuestion(array[rowIndex].question_id, {
                            ...array[rowIndex],
                            request_reason: e.target.checked,
                        }).then((res) => {
                            if (res.data?.response) {
                                update(rowIndex, { ...array[rowIndex], ...res.data.response });
                            }
                        });
                    }}
                />
            ),
        },
    ];
}

function getTableColumns(
    section_id: number,
    isSmallScreen: boolean,
    isMediumScreen: boolean,
    isLargeScreen: boolean,
    setConfirmationAction: React.Dispatch<React.SetStateAction<(() => void) | null>>,
    watch: UseFormWatch<IQuestionTableFormData>,
    setValue: UseFormSetValue<IQuestionTableFormData>,
    append: UseFieldArrayReturn<IQuestionTableFormData['questions']>['append'],
    update: UseFieldArrayReturn<IQuestionTableFormData['questions']>['update'],
    remove: UseFieldArrayReturn<IQuestionTableFormData['questions']>['remove']
): ITableColumnProps<any>[] {
    const collapseStates = watch('collapseStates');
    let columns: ITableColumnProps<any>[] = [
        {
            label: <>Question</>,
            name: 'question',
            columnStyle: {
                width: '45%',
                textAlign: 'center',
                minWidth: '60px',
            },
            renderFunction: (value, rowIndex, array) => (
                <UncontrolledTextField
                    label={<>Question</>}
                    initialValue={value}
                    fullWidth
                    multiline
                    onBlur={(e) => {
                        updateQuestion(array[rowIndex].question_id, {
                            ...array[rowIndex],
                            question: e.currentTarget.value,
                        }).then((res) => {
                            if (res.data?.response) {
                                update(rowIndex, { ...array[rowIndex], ...res.data.response });
                            }
                        });
                    }}
                />
            ),
        },
        {
            label: <>Type</>,
            name: 'type',
            columnStyle: {
                width: '10%',
                textAlign: 'center',
                minWidth: '60px',
            },
            renderFunction: (value, rowIndex, array) => (
                <Select
                    fullWidth
                    value={value}
                    onChange={(event) => {
                        updateQuestion(array[rowIndex].question_id, {
                            ...array[rowIndex],
                            type: event.target.value as QuizQuestionType,
                        }).then((res) => {
                            if (res.data?.response) {
                                update(rowIndex, { ...array[rowIndex], ...res.data.response });
                            }
                        });
                    }}
                    style={{ height: '56px', boxSizing: 'border-box' }}
                >
                    <MenuItem value={QuizQuestionType.TEXT}>
                        <ListItemText primary={QuizQuestionType.TEXT} />
                    </MenuItem>
                    <MenuItem value={QuizQuestionType.SLIDER}>
                        <ListItemText primary={QuizQuestionType.SLIDER} />
                    </MenuItem>
                </Select>
            ),
        },
        {
            label: isSmallScreen ? (
                <></>
            ) : (
                <ResponsiveButton
                    title={'Add New'}
                    Icon={<PostAddIcon />}
                    onClick={(event) => {
                        insertQuestion(section_id).then((res) => {
                            if (res.data?.response) append(res.data.response);
                        });
                    }}
                />
            ),
            name: undefined,
            columnStyle: {
                width: '10%',
                textAlign: 'center',
                minWidth: '60px',
            },
            renderFunction: (value, rowIndex, array) => (
                <Stack
                    display={'flex'}
                    flex={1}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={isSmallScreen ? 'space-between' : 'center'}
                >
                    <ResponsiveButton
                        title={isSmallScreen ? 'Delete' : undefined}
                        Icon={<DeleteIcon />}
                        color={'error'}
                        onClick={() => {
                            setConfirmationAction(() => () => {
                                removeQuestion(array[rowIndex].question_id).then((res) => {
                                    remove(rowIndex);
                                });
                            });
                        }}
                    />
                    {isSmallScreen && (
                        <ResponsiveButton
                            Icon={collapseStates[rowIndex] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            onClick={() => {
                                setValue(`collapseStates.${rowIndex}`, !collapseStates[rowIndex]);
                            }}
                        />
                    )}
                </Stack>
            ),
        },
    ];
    if (!isSmallScreen) {
        columns.unshift({
            label: <>ID #</>,
            name: 'question_id',
            columnStyle: {
                width: '10%',
                textAlign: 'center',
                minWidth: '60px',
            },
            renderFunction: (value, rowIndex, array) => (
                <>
                    {rowIndex + 1}
                    <IconButton
                        size="small"
                        onClick={() => {
                            setValue(`collapseStates.${rowIndex}`, !collapseStates[rowIndex]);
                        }}
                        style={{ marginLeft: '1em' }}
                    >
                        {collapseStates[rowIndex] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </>
            ),
        });
    }
    if (isSmallScreen) {
        columns.splice(2, 0, ...getAdditionalAttributesColumns(update));
    } else if (isLargeScreen) {
        columns.splice(3, 0, ...getAdditionalAttributesColumns(update));
    }
    return columns;
}

function getOptionsTableColumns(
    isSmallScreen: boolean,
    question_id: number,
    rowIndex: number,
    fields: IQuestionTableFormData['questions'],
    update: UseFieldArrayReturn<IQuestionTableFormData['questions']>['update']
): ITableColumnProps<any>[] {
    const columns: ITableColumnProps<any>[] = [
        {
            label: isSmallScreen ? <></> : <>Option</>,
            name: 'option',
            columnStyle: {
                width: '20%',
                textAlign: 'center',
                minWidth: '60px',
            },
            renderFunction: (value, optionIndex, array) => (
                <UncontrolledTextField
                    label={<>Option</>}
                    initialValue={value}
                    fullWidth
                    multiline
                    onBlur={(e) => {
                        const option = array[optionIndex];
                        const payload = {
                            ...option,
                            option: e.currentTarget.value,
                        };
                        updateQuestionOption(option.question_option_id, payload).then((res) => {
                            if (res.data?.response) {
                                const question = fields[rowIndex];
                                question.question_options[optionIndex] = res.data.response;
                                update(rowIndex, question);
                            }
                        });
                    }}
                />
            ),
        },
        {
            label: isSmallScreen ? (
                <></>
            ) : (
                <ResponsiveButton
                    Icon={<AddIcon />}
                    onClick={() => {
                        insertQuestionOption(question_id).then((res) => {
                            if (res.data?.response) {
                                const question = fields[rowIndex];
                                _.set(question, 'question_options', [
                                    ...(question.question_options || []),
                                    res.data.response,
                                ]);
                                update(rowIndex, question);
                            }
                        });
                    }}
                />
            ),
            name: undefined,
            columnStyle: {
                width: '20%',
                textAlign: 'center',
                minWidth: '60px',
            },
            renderFunction: (value, optionIndex, array) => (
                <ResponsiveButton
                    Icon={<DeleteIcon />}
                    color={'error'}
                    onClick={() => {
                        removeQuestionOption(array[optionIndex].question_option_id).then((res) => {
                            const question = fields[rowIndex];
                            question.question_options.splice(optionIndex, 1);
                            update(rowIndex, question);
                        });
                    }}
                />
            ),
        },
    ];
    if (!isSmallScreen) {
        columns.unshift({
            label: <>ID #</>,
            name: 'option_id',
            columnStyle: {
                width: '20%',
                textAlign: 'center',
                minWidth: '60px',
            },
            renderFunction: (value, optionIndex, array) => <>{optionIndex + 1}</>,
        });
    }
    return columns;
}
