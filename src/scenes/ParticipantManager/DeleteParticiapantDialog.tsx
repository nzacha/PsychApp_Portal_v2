import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IProjectParticipantData } from '../../models/ProjectParticipant';

export type IDeleteConfirmationDialogData = {
    participant: IProjectParticipantData | null;
    onConfirm?: () => void;
    open: boolean;
};
interface IDeleteConfirmationDialogProps{
    data: IDeleteConfirmationDialogData;
    setData: React.Dispatch<React.SetStateAction<IDeleteConfirmationDialogData>>;
}
export function DeleteParticipantDialog({data, setData}: IDeleteConfirmationDialogProps) {
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
