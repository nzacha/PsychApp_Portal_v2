import { useState } from 'react';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { ModelNamesEnum } from '../../config/models';
import { defaultAPIAction } from '../../store/common/actions';
import { HttpMethod } from '../../config/httpMethods';
import { IUserData } from 'models/Users';
import { useDispatch } from 'react-redux';
import { fetchLinks, fetchProjects } from '.';

interface ICreateNewProjectDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    users: IUserData[];
}
export function CreateNewProjectDialog({
    open,
    setOpen,
    users,
}: ICreateNewProjectDialogProps) {
    const dispatch = useDispatch();

    const [newProjectName, setNewProjectName] = useState('New Project');
    const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
    const [newDownloadLink, setNewDownloadLink] = useState('http://www...');

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogContent style={{ minWidth: '200px' }}>
                <Stack spacing={1}>
                    <DialogContentText>Project Details</DialogContentText>
                    <TextField
                        label={'Project Name'}
                        value={newProjectName}
                        onChange={(event) => {
                            setNewProjectName(event.target.value);
                        }}
                    />
                    <Autocomplete
                        options={users}
                        onChange={(event, value) => setSelectedUser(value)}
                        getOptionLabel={(option) =>
                            option.first_name + ' ' + option.last_name
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Director" />
                        )}
                    />
                    <TextField
                        label={'Download Link'}
                        type={'url'}
                        value={newDownloadLink}
                        onChange={(e) =>
                            setNewDownloadLink(e.currentTarget.value)
                        }
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    disabled={selectedUser == null}
                    onClick={() => {
                        if (selectedUser) {
                            defaultAPIAction({
                                path: `/${ModelNamesEnum.Project}`,
                                method: HttpMethod.PUT,
                                body: {
                                    name: newProjectName,
                                    director_id: selectedUser.user_id,
                                    download_link: newDownloadLink,
                                },
                                onFinish: (s, r) => {
                                    if (s) {
                                        setOpen(false);
                                        fetchProjects(dispatch);
                                        fetchLinks(dispatch);
                                    }
                                },
                            })(dispatch, '');
                        }
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
