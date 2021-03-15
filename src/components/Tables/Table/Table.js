import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton
} from '@material-ui/core'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import LastPageIcon from '@material-ui/icons/LastPage'

import SearchBar from 'material-ui-search-bar'
import { StyledTableContainer, StyledPaper, H2 } from './TableStyled.js'
import Button from '../../../UI/Button/Button'
import styled from 'styled-components'

// const StyledPaper = styled(Paper)`
// ${({ theme }) => `
//   ${theme.breakpoints.up('sm')} {
//   `}
//   ${tableStylesSmall};
// `;

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div style={{ flexShrink: 0 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default function CustomPaginationActionsTable(props) {
  const theme = useTheme()
  const rowsData = props.data

  const [rows, setRows] = useState(rowsData)
  const [searched, setSearched] = useState('')

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(
    props.rowsPerPageOnStart[0]
  )

  const requestSearch = (searchedVal) => {
    if (searchedVal !== '') {
      const filteredRows = rows.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase())
      })
      setRows(filteredRows)
    } else {
      setRows(rowsData)
    }
  }

  const cancelSearch = () => {
    setSearched('')
    requestSearch(searched)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    setRows(rowsData)
  }, [rowsData])

  return (
    <>
      <H2>{props.title}</H2>
      <StyledPaper>
        <SearchBar
          placeholder="Szukaj"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          style={{
            backgroundImage: `${theme.mainGradient}`
          }}
        />
        <Table aria-label="dodaj gracza">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <Button
                    color={props.buttonColor}
                    size="small"
                    variant="contained"
                    onClick={() => props.handleClick(row.id)}
                    title={props.buttonTitle}></Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage="wierszy na stronę"
                rowsPerPageOptions={[
                  props.rowsPerPageOnStart[0],
                  props.rowsPerPageOnStart[1],
                  props.rowsPerPageOnStart[2],
                  {
                    label: 'All',
                    value: -1
                  }
                ]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'wierszy na stronę'
                  },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </StyledPaper>
    </>
  )
}
