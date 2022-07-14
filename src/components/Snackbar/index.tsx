import { Alert, AlertColor, Slide, SlideProps, Snackbar } from '@mui/material';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { defaultAction } from '../../store/common/actions';
import { useSelectSnackBarData } from '../../store/staticReducers/commonReducer/selectors';
import { SET_SNACKBAR_DATA } from '../../store/staticReducers/commonReducer/types';
import {
    durationToMs,
    IDuration,
    longDuration,
    normalDuration,
    shortDuration,
} from './config';

export interface ISnackBarOptions {
    isOpen: boolean;
    message?: string;
    severity?: AlertColor;
    duration?: IDuration;
}

export function showSnackBar(data: Omit<ISnackBarOptions, 'isOpen'>) {
    return async (dispatch: Dispatch<any>) => {
        defaultAction({ data: { isOpen: true, ...data } })(
            dispatch,
            SET_SNACKBAR_DATA
        );
    };
}

function SlideTransition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}

export function AppSnackbar() {
    const dispatch = useDispatch();
    const {
        isOpen,
        message,
        severity,
        duration = normalDuration,
    } = useSelectSnackBarData();

    const handleClose = () => {
        defaultAction({ data: { isOpen: false } })(dispatch, SET_SNACKBAR_DATA);
    };
    const alert = (
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    );
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={durationToMs(duration)}
            onClose={handleClose}
            message={!severity && message}
            children={severity && alert}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
    );
}
