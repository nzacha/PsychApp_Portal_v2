import { Fade, Box } from '@mui/material';
import { UseFieldArrayReturn } from 'react-hook-form';
import _ from 'lodash';
import { AlignmentOptions } from 'config/componentProperties';
import useWindowDimensions from 'hooks/useWindowDimensions';
import MobileList from './MobileList';
import { CSSProperties, useState } from 'react';
import DataTable from './DataTable';
import { drawerTransitionTime } from 'navigation';

export function PlainTextColumnFunction(value: string) {
    return <>{value}</>;
}

type RenderFunction<T> = (value: string, index: number, data: IResponsiveTableProps<T>['data']) => JSX.Element;
type RenderCollapsableFunction<T> = (row: T, rowIndex: number, data: IResponsiveTableProps<T>['data']) => JSX.Element;
type getRowStyles<T> = (index: number, data: IResponsiveTableProps<T>['data']) => CSSProperties;

export interface ITableColumnProps<T> {
    name?: string;
    label: JSX.Element;
    renderFunction?: RenderFunction<T>;
    labelStyle?: CSSProperties;
    columnStyle?: CSSProperties;
    align?: AlignmentOptions;
}
export interface ITableProps<T> {
    columns: ITableColumnProps<T>[];
    getRowStyle?: getRowStyles<T>;
    renderCollapsable?: RenderCollapsableFunction<T>;
    getCollapseStatus?: (rowIndex: number) => boolean;
    collapsableStyle?: CSSProperties;
    stickyHeader?: boolean;
    hideScroll?: boolean;
    hidePagination?: boolean;
    headerStyle?: CSSProperties;
    bodyStyle?: CSSProperties;
    style?: CSSProperties;
    useCardView?: boolean;
    useCardCollapse?: boolean;
    renderTitle?: (rowIndex: number) => JSX.Element;
}

/*  
Used by the Responsive components "Mobile List" and "Datatable"
*/
export interface IResponsiveComponentProps<T> extends IResponsiveTableProps<T> {
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: any, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IResponsiveTableProps<T> extends ITableProps<T> {
    data: T[];
}
function ResponsiveTable<T>(props: IResponsiveTableProps<T>) {
    const { isSmallScreen } = useWindowDimensions();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Fade in={true} timeout={drawerTransitionTime}>
            <Box style={{ width: '100%', height: '100%' }}>
                {/* {props.renderHeader && props.renderHeader(insert, edit, remove)} */}
                {isSmallScreen ? (
                    <MobileList
                        {...props}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                ) : (
                    <DataTable
                        {...props}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            </Box>
        </Fade>
    );
}

type IControlledResponsiveTableProps<T> = ITableProps<T> & {
    fieldArrayProps: UseFieldArrayReturn;
};
export function ControlledResponsiveTable<T = any>({ fieldArrayProps, ...props }: IControlledResponsiveTableProps<T>) {
    return <ResponsiveTable {...props} data={fieldArrayProps.fields as any as T[]} />;
}

interface IUncontrolledResponsiveTableProps<T> extends IResponsiveTableProps<T> {}
export function UncontrolledResponsiveTable<T = any>(props: IUncontrolledResponsiveTableProps<T>) {
    return <ResponsiveTable {...props} />;
}
