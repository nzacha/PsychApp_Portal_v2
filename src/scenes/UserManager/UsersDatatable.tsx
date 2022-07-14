import * as React from 'react';
import Box from '@mui/material/Box';
import { IUserData } from '../../models/Users';
import { Fade, Stack, Tooltip, useTheme } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Control, useFieldArray, UseFieldArrayReturn } from 'react-hook-form';
import { CreateUserDialog } from './CreateUserDialog';
import { useState } from 'react';
import { drawerTransitionTime } from 'navigation';
import useWindowDimensions from 'hooks/useWindowDimensions';
import {
    ControlledResponsiveTable,
    ITableColumnProps,
    PlainTextColumnFunction,
} from 'components/common/FormControl/Table';
import { ResponsiveButton } from 'components/common/FormControl/Button';
import { DeleteUserDialog, IDeleteConfirmationDialogData } from './DeleteUserDialog';
import { deleteUserAction } from './config';

export interface IUserTableData {
    users: IUserData[];
}
interface IUserDatatableProps {
    control: Control<IUserTableData>;
}
export function UsersDatatable({ control }: IUserDatatableProps) {
    const theme = useTheme();

    const { isSmallScreen } = useWindowDimensions();

    const fieldArrayProps = useFieldArray<IUserTableData>({
        control: control,
        name: 'users',
    });

    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [deleteDialogData, setDeleteDialogData] = useState<IDeleteConfirmationDialogData>({
        user: null,
        open: false,
    });
    return (
        <>
            <CreateUserDialog open={createDialogOpen} setOpen={setCreateDialogOpen} append={fieldArrayProps.append} />
            <DeleteUserDialog data={deleteDialogData} setData={setDeleteDialogData} />
            <Fade in={fieldArrayProps.fields.length > 0} timeout={drawerTransitionTime}>
                <Box>
                    {isSmallScreen && (
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            style={{ marginBottom: '0.5em' }}
                        >
                            <InsertUserButton setOpen={setCreateDialogOpen} />
                        </Stack>
                    )}
                    <ControlledResponsiveTable
                        fieldArrayProps={fieldArrayProps}
                        columns={getTableColumns(
                            setCreateDialogOpen,
                            setDeleteDialogData,
                            isSmallScreen,
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
        </>
    );
}
export default React.memo(UsersDatatable);

function getTableColumns(
    setCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setDeleteDialogData: React.Dispatch<React.SetStateAction<IDeleteConfirmationDialogData>>,
    isSmallScreen: boolean,
    remove: UseFieldArrayReturn['remove']
): ITableColumnProps<any>[] {
    return [
        {
            label: <>ID #</>,
            name: 'user_id',
            columnStyle: { width: '10%', textAlign: 'start' },
            renderFunction: PlainTextColumnFunction,
        },
        {
            label: <>Email</>,
            name: 'email',
            columnStyle: { width: '20%', textAlign: 'center' },
            renderFunction: PlainTextColumnFunction,
        },
        {
            label: <>First Name</>,
            name: 'first_name',
            columnStyle: { width: '20%', textAlign: 'center' },
            renderFunction: PlainTextColumnFunction,
        },
        {
            label: <>Last Name</>,
            name: 'last_name',
            columnStyle: { width: '20%', textAlign: 'center' },
            renderFunction: PlainTextColumnFunction,
        },
        {
            label: <>{!isSmallScreen && <InsertUserButton setOpen={setCreateDialogOpen} />}</>,
            name: undefined,
            align: 'right',
            columnStyle: {
                width: '20%',
            },
            renderFunction: (value, rowIndex, array) => (
                <Box display={'flex'} justifyContent={isSmallScreen ? 'center' : 'end'}>
                    <Tooltip title={'Delete User'} placement={'top'}>
                        <span>
                            <ResponsiveButton
                                Icon={<DeleteIcon />}
                                color={'error'}
                                disabled={false}
                                onClick={(event) => {
                                    const user = array[rowIndex];
                                    setDeleteDialogData({
                                        open: true,
                                        user: user,
                                        onConfirm: () =>
                                            deleteUserAction(user.user_id).then((res) => {
                                                remove(rowIndex);
                                            }),
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

interface InsertUserButtonProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function InsertUserButton({ setOpen }: InsertUserButtonProps) {
    return (
        <Tooltip title={'Insert New User'} placement={'top'}>
            <span>
                <ResponsiveButton
                    title={'Add New'}
                    Icon={<PostAddIcon />}
                    disabled={false}
                    onClick={() => {
                        setOpen(true);
                    }}
                />
            </span>
        </Tooltip>
    );
}
