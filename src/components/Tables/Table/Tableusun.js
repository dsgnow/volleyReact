import React, { useState } from 'react';
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const originalRows = [
  {
    id: '1',
    name: 'Brylant Barber',
    skill: 6,
    endTime: '2021/01/02 02:00:00',
    info: '',
    gender: 'male'
  },
  {
    id: '2',
    name: 'Piotr Stachowicz',
    skill: 6,
    endTime: '2021/01/02 01:00:00',
    info: '',
    gender: 'male'
  }
];

export default function BasicTable() {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState('');
  const classes = useStyles();

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <SearchBar
                value={searched}
                onChange={(searchVal) =>
                  requestSearch(searchVal)
                }
                onCancelSearch={() => cancelSearch()}
              />
              <StyledTableRow>
                <StyledTableCell>Gracz</StyledTableCell>
                <StyledTableCell align="right">
                  Dodaj gracza
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button>Dodaj</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
