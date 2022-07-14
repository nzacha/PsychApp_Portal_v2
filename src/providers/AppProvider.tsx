import React, { Dispatch } from 'react';
import { SnackbarProvider, useSnackbar, VariantType } from 'notistack';
import { SET_STACKED_SNACKBAR_DATA } from '../store/staticReducers/commonReducer/types';
import { defaultAction } from '../store/common/actions';
import { useSelectStackedSnackBarData } from '../store/staticReducers/commonReducer/selectors';
import { normalDuration } from '../components/Snackbar/config';
import { AppSnackbar } from '../components/Snackbar';

export interface IStackedSnackBarOptions {
    message: string;
    options: {
        variant: VariantType;
        // duration: IDuration;
    };
}

export function showStackedSnackBar(data: IStackedSnackBarOptions) {
    return async (dispatch: Dispatch<any>) => {
        defaultAction({ data: data })(dispatch, SET_STACKED_SNACKBAR_DATA);
    };
}

const AppStackedSnackbar: React.FC = (props) => {
    const stackedSnackbar = useSelectStackedSnackBarData();
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        for (var data of stackedSnackbar) {
            enqueueSnackbar(data.message, {
                variant: data.options.variant,
                autoHideDuration: normalDuration,
            });
        }
        stackedSnackbar.length = 0;
    }, [stackedSnackbar, enqueueSnackbar]);

    return <>{props.children}</>;
};

export const AppProvider: React.FC = (props) => {
    return (
        <SnackbarProvider maxSnack={3}>
            <AppSnackbar />
            <AppStackedSnackbar {...props} />
        </SnackbarProvider>
    );
};
