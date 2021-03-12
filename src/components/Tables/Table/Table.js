import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Button
} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';
import LastPageIcon from '@material-ui/icons/LastPage';

import SearchBar from 'material-ui-search-bar';
import { myStyles } from './TableStyles.js';
import {
  StyledTableContainer,
  StyledPaper,
  Paragraph
} from './TableStyled.js';
import styled from 'styled-components';

// const StyledPaper = styled(Paper)`
// ${({ theme }) => `
//   ${theme.breakpoints.up('sm')} {
//   `}
//   ${tableStylesSmall};
// `;

const StyledButton = styled(Button)`
  padding: 5px 20px;
  text-transform: none;
  outline: none;
  text-decoration: none;
`;

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1)
    );
  };

  return (
    <div style={{ flexShrink: 0 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? (
          <LastPageIcon />
        ) : (
          <FirstPageIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={
          page >= Math.ceil(count / rowsPerPage) - 1
        }
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={
          page >= Math.ceil(count / rowsPerPage) - 1
        }
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? (
          <FirstPageIcon />
        ) : (
          <LastPageIcon />
        )}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const rowsData = [
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

export default function CustomPaginationActionsTable() {
  const theme = useTheme();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState(rowsData);
  const [searched, setSearched] = useState('');

  const requestSearch = (searchedVal) => {
    if (searchedVal !== '') {
      const filteredRows = rows.filter((row) => {
        return row.name
          .toLowerCase()
          .includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    } else {
      setRows(rowsData);
    }
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StyledTableContainer>
      <Paragraph>
        Look at my buttons, they are amazing buttons !
      </Paragraph>
      <StyledPaper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          style={{
            backgroundImage: `${theme.mainGradient}`
          }}
        />
        <Table aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell
                  style={{ width: 160 }}
                  align="right"
                >
                  <StyledButton
                    color="primary"
                    size="small"
                    variant="contained"
                  >
                    Dodaj gracza
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: 'All', value: -1 }
                ]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page'
                  },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={
                  handleChangeRowsPerPage
                }
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </StyledPaper>
    </StyledTableContainer>
  );
}
