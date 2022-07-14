import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { UseFieldArrayReturn } from 'react-hook-form';
import { insertUserAction, isValidEmail } from './config';

interface ICreateUserDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    append: UseFieldArrayReturn['append'];
}
export function CreateUserDialog({
    open,
    setOpen,
    append,
}: ICreateUserDialogProps) {
    const [newEmail, setNewEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The registration result will be sent to the following email
                </DialogContentText>
                <Stack spacing={1}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="First Name"
                        autoComplete={'none'}
                        variant="standard"
                        value={firstName}
                        onChange={(event) =>
                            setFirstName(event.currentTarget.value)
                        }
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        autoComplete={'none'}
                        variant="standard"
                        value={lastName}
                        onChange={(event) =>
                            setLastName(event.currentTarget.value)
                        }
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        autoComplete={'none'}
                        variant="standard"
                        value={newEmail}
                        onChange={(event) =>
                            setNewEmail(event.currentTarget.value)
                        }
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    disabled={newEmail.length === 0}
                    onClick={() => {
                        if (isValidEmail(newEmail)) {
                            insertUserAction(
                                newEmail,
                                firstName,
                                lastName
                            ).then((res) => {
                                if (res.data?.response) {
                                    setOpen(false);
                                    append(res.data.response);
                                }
                            });
                        } else {
                            console.error('invalid email', newEmail);
                        }
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
