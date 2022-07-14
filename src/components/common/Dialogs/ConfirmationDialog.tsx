import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';

interface IConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    content?: JSX.Element;
    cancelationText?: string;
    confirmationText?: string;
    onConfirm?: () => void;
}
export function ConfirmationDialog({
    open,
    title,
    content,
    cancelationText = 'Cancel',
    confirmationText = 'Confirm',
    onConfirm,
    onClose,
}: IConfirmationDialogProps) {
    return (
        <Dialog open={open} onClose={() => onClose()} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <Divider />
            <DialogContent style={{ minHeight: '20px' }}>{content}</DialogContent>
            <Divider />
            <DialogActions>
                <Button
                    color={'warning'}
                    variant={'contained'}
                    onClick={() => {
                        onClose();
                    }}
                >
                    {cancelationText}
                </Button>
                {onConfirm && (
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        autoFocus
                    >
                        {confirmationText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
