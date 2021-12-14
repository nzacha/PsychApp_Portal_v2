import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { AlignmentOptions } from '../../../config/componentProperties';

export interface IColumn{
  id: string;
  label: string;
  minWidth?: number;
  align?: AlignmentOptions;
  format?: (value: number) => string;
}

export interface IDataTableProps{
    data: any;
    columns: IColumn[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.info.contrastText,
    },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
}));

export default function DataTable(props: IDataTableProps) {
    const styles={};
    // const styles = (theme: Theme) =>{
    //     createStyles({
    //         scrollBar: {
    //             '::-webkit-scrollbar': {
    //                 width: '10px'
    //             },
    //             '::-webkit-scrollbar-track': {
    //                 '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    //             },
    //             '::-webkit-scrollbar-thumb': {
    //                 backgroundColor: 'rgba(0,0,0,.1)',
    //                 outline: '1px solid slategrey'
    //             }
    //         }
    //     })
    // };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
    <Paper variant={'outlined'}>
        <TableContainer style={{maxHeight: 'calc(100vh - 270px)', ...styles}}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {props.columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {props.columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}