import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from '@material-ui/core'
import TablePaginationActions from './TablePaginationActions'
import Button from '../../../UI/Button/Button'
import {
  StyledPaper,
  StyledTypography,
  StyledTableHead,
  StyledSearchBar
} from './TableStyled.js'
import cloneDeep from 'lodash/cloneDeep'

// const StyledPaper = styled(Paper)`
// ${({ theme }) => `
//   ${theme.breakpoints.up('sm')} {
//   `}
//   ${tableStylesSmall};
// `;

export default function CustomPaginationActionsTable(props) {
  const rowsData = props.data
  const rowsDataDeepCopy = cloneDeep(props.data)

  const [rows, setRows] = useState(rowsData)
  const [searched, setSearched] = useState('')

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(
    props.rowsPerPageOnStart[0]
  )

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal)
    const filteredColumn = props.filteredColumn
    const filteredRows = rowsDataDeepCopy.filter((row) => {
      return row[filteredColumn]
        .toLowerCase()
        .includes(searchedVal.toLowerCase())
    })
    setRows(filteredRows)
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

  CustomPaginationActionsTable.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    buttonColor: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string,
    columns: PropTypes.array.isRequired,
    rowsPerPageOnStart: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
    filteredColumn: PropTypes.string.isRequired
  }

  return (
    <>
      <StyledPaper>
        <StyledTypography variant="h5">{props.title}</StyledTypography>
        <StyledSearchBar
          align={'right'}
          placeholder="Szukaj"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <Table aria-label={props.label}>
          <StyledTableHead>
            <TableRow>
              {props.tableHeaders.map((header) => (
                <TableCell style={{ fontWeight: '700' }} key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                {props.columns.map((column) => (
                  <TableCell key={column} component="th" scope="row">
                    {row[column]}
                  </TableCell>
                ))}
                {props.buttonTitle && (
                  <TableCell style={{ width: 160 }} align="right">
                    <Button
                      color={props.buttonColor}
                      size="small"
                      variant="contained"
                      onClick={() => props.handleClick(row.id)}
                      title={props.buttonTitle}></Button>
                  </TableCell>
                )}
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
