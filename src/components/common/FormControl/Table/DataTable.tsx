import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Collapse,
    Box,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { IResponsiveComponentProps } from '.';
import React, { Fragment } from 'react';

export default function DataTable<T>({
    data = [],
    columns,
    getRowStyle,
    renderCollapsable,
    getCollapseStatus = () => false,
    collapsableStyle,
    stickyHeader,
    hideScroll,
    hidePagination,
    headerStyle,
    bodyStyle,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    style,
}: IResponsiveComponentProps<T>) {
    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <TableContainer
                component={Paper}
                style={{ ...style, maxHeight: hideScroll ? undefined : 'calc(100vh - 270px)' }}
            >
                <Table stickyHeader={stickyHeader}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.name + '_' + index}
                                    align={column.align}
                                    style={{
                                        ...column.columnStyle,
                                        ...headerStyle,
                                        ...column.labelStyle,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                colSpan={columns?.length}
                                style={{
                                    padding: 0,
                                    // paddingTop: 0,
                                    // paddingBottom: 0,
                                    // paddingLeft: '0.3em',
                                    // paddingRight: '0.3em',
                                }}
                            >
                                <Collapse in={data.length > 0} style={{ width: '100%' }}>
                                    <Table>
                                        <TableBody>
                                            {data
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row: any, rowIndex: number) => {
                                                    return (
                                                        <Fragment key={`row_${rowIndex}`}>
                                                            <TableRow
                                                                hover
                                                                tabIndex={-1}
                                                                style={{
                                                                    padding: 0,
                                                                    ...(getRowStyle
                                                                        ? getRowStyle(rowIndex, data)
                                                                        : undefined),
                                                                    ...bodyStyle,
                                                                }}
                                                            >
                                                                {columns.map((column) => {
                                                                    const value = column.name
                                                                        ? _.get(row, column.name)
                                                                        : undefined;
                                                                    return (
                                                                        <TableCell
                                                                            key={`row_${rowIndex}_column_${column.name}`}
                                                                            align={column.align}
                                                                            style={column.columnStyle}
                                                                        >
                                                                            {(column.renderFunction &&
                                                                                column.renderFunction(
                                                                                    value,
                                                                                    rowIndex,
                                                                                    data
                                                                                )) ||
                                                                                ''}
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell
                                                                    colSpan={columns?.length}
                                                                    style={{
                                                                        padding: 0,
                                                                        paddingBottom: '1em',
                                                                        paddingLeft: '5em',
                                                                        paddingRight: '5em',
                                                                        ...collapsableStyle,
                                                                    }}
                                                                >
                                                                    <Collapse in={getCollapseStatus(rowIndex)}>
                                                                        {renderCollapsable &&
                                                                            renderCollapsable(row, rowIndex, data)}
                                                                    </Collapse>
                                                                </TableCell>
                                                            </TableRow>
                                                        </Fragment>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {hidePagination ? (
                <></>
            ) : (
                <TablePagination
                    showFirstButton
                    showLastButton
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Box>
    );
}

const StyledTableCell = styled(TableCell)(({ theme, style }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.info.dark,
        // color: theme.palette.info.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    ...style,
}));

const StyledTableRow = styled(TableRow)(({ theme, style }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[200],
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.grey[50],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    ...style,
}));
