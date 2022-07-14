import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IUserData } from 'models/Users';

export type IDeleteConfirmationDialogData = {
    open: boolean;
    user: IUserData | null;
    onConfirm?: () => void;
};
interface IDeleteConfirmationDialogProps {
    data: IDeleteConfirmationDialogData;
    setData: React.Dispatch<React.SetStateAction<IDeleteConfirmationDialogData>>;
}
export function DeleteUserDialog({ data, setData }: IDeleteConfirmationDialogProps) {
    return (
        <div>
            <Dialog open={data.open} onClose={() => setData({ user: null, open: false })}>
                <DialogTitle>{`Delete User`}</DialogTitle>
                <DialogContent>
                    {`Are you sure you want to delete user:`}
                    <br />
                    <ul>
                        {data.user?.first_name && <li>{`First name: ${data.user.first_name}`}</li>}
                        {data.user?.last_name && <li>{`Last name: ${data.user.last_name}`}</li>}
                        {data.user?.email && <li>{`Email: ${data.user.email}`}</li>}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button
                        color={'warning'}
                        variant={'contained'}
                        onClick={() => {
                            setData({ user: null, open: false });
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => {
                            setData({ user: null, open: false });
                            if (data.onConfirm) data.onConfirm();
                        }}
                        autoFocus
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
