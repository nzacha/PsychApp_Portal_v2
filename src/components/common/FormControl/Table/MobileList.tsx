import * as React from 'react';
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Collapse,
    CardHeader,
    IconButton,
    CardActions,
    Button,
} from '@mui/material';
import _ from 'lodash';
import { IResponsiveComponentProps } from '.';
import './styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

interface IMobileItemRowProps<T> {
    row: T;
    rowIndex: number;
    data: IResponsiveComponentProps<T>['data'];
    columns: IResponsiveComponentProps<T>['columns'];
    renderCollapsable: IResponsiveComponentProps<T>['renderCollapsable'];
    getCollapseStatus: IResponsiveComponentProps<T>['getCollapseStatus'];
    collapsableStyle: IResponsiveComponentProps<T>['collapsableStyle'];
}
function MobileItemRow<T>({
    row,
    rowIndex,
    data,
    columns,
    renderCollapsable,
    getCollapseStatus = () => false,
    collapsableStyle,
}: IMobileItemRowProps<T>) {
    return (
        <List style={{ padding: 0, width: '100%' }}>
            {columns.map((column, colIndex) => {
                const value = column.name ? _.get(row, column.name, undefined) : undefined;
                return (
                    <ListItem
                        key={colIndex}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemText
                            primaryTypographyProps={{
                                textAlign: 'center',
                            }}
                            secondaryTypographyProps={{
                                textAlign: 'center',
                                component: 'span',
                            }}
                            primary={column.label}
                            secondary={(column.renderFunction && column.renderFunction(value, rowIndex, data)) || ''}
                            style={{
                                padding: 0,
                                margin: 0,
                                ...column.columnStyle,
                            }}
                        />
                    </ListItem>
                );
            })}
            <ListItem
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Collapse in={getCollapseStatus(rowIndex)} style={{ width: '100%' }}>
                    {renderCollapsable && renderCollapsable(row, rowIndex, data)}
                </Collapse>
            </ListItem>
        </List>
    );
}

export default function MobileList<T>({
    columns,
    getRowStyle,
    renderCollapsable,
    getCollapseStatus,
    collapsableStyle,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    hidePagination,
    hideScroll,
    useCardView = true,
    useCardCollapse,
    renderTitle,
    style,
    ...props
}: IResponsiveComponentProps<T>) {
    const data = (props.data || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const [collapseStates, setCollapseStates] = useState<boolean[]>(new Array(data.length).fill(false));

    return (
        <div id={'Mobile_List'}>
            <TableContainer
                component={'div'}
                style={{
                    ...style,
                    maxHeight: hideScroll ? undefined : 'calc(100vh - 270px)',
                    backgroundColor: useCardView ? 'transparent' : undefined,
                }}
            >
                <Table stickyHeader={true}>
                    <TableBody>
                        {data.map((row, rowIndex) => {
                            return (
                                <TableRow key={rowIndex}>
                                    <TableCell>
                                        {useCardView ? (
                                            <Card
                                                variant={'elevation'}
                                                elevation={3}
                                                style={{
                                                    borderRadius: 15,
                                                }}
                                            >
                                                <CardHeader
                                                    title={renderTitle && renderTitle(rowIndex)}
                                                    action={
                                                        useCardCollapse && (
                                                            <IconButton
                                                                onClick={() => {
                                                                    const newStates = collapseStates.slice();
                                                                    newStates[rowIndex] = !newStates[rowIndex];
                                                                    setCollapseStates(newStates);
                                                                }}
                                                            >
                                                                {collapseStates[rowIndex] ? (
                                                                    <KeyboardArrowUpIcon />
                                                                ) : (
                                                                    <KeyboardArrowDownIcon />
                                                                )}
                                                            </IconButton>
                                                        )
                                                    }
                                                />
                                                <CardContent
                                                    style={{
                                                        padding: 0,
                                                    }}
                                                >
                                                    <Collapse
                                                        in={
                                                            (useCardCollapse && collapseStates[rowIndex]) ||
                                                            !useCardCollapse
                                                        }
                                                    >
                                                        <MobileItemRow
                                                            row={row}
                                                            rowIndex={rowIndex}
                                                            data={data}
                                                            columns={columns}
                                                            renderCollapsable={renderCollapsable}
                                                            getCollapseStatus={getCollapseStatus}
                                                            collapsableStyle={collapsableStyle}
                                                        />
                                                    </Collapse>
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <MobileItemRow
                                                row={row}
                                                rowIndex={rowIndex}
                                                data={data}
                                                columns={columns}
                                                renderCollapsable={renderCollapsable}
                                                getCollapseStatus={getCollapseStatus}
                                                collapsableStyle={collapsableStyle}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
        </div>
    );
}
