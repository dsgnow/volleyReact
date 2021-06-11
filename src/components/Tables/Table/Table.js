import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  InputLabel,
  FormControl,
  Select
} from '@material-ui/core'
import TablePaginationActions from './TablePaginationActions'
import Button from '../../../UI/Button/Button'
import {
  StyledPaper,
  StyledTypography,
  StyledTableHead,
  WrapSearch,
  StyledSearchBar
} from './TableStyled.js'

export default function CustomPaginationActionsTable(props) {
  const rowsData = props.data

  const [rows, setRows] = useState(rowsData)
  const [searched, setSearched] = useState('')
  const [search, setSearch] = useState('')
  const [skill, setSkill] = useState(0)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(
    props.rowsPerPageOnStart[0]
  )

  const requestSearch = (searchedVal) => {
    const filteredColumn = props.filteredColumn
    const filteredRows = rowsData.filter((row) => {
      return row[filteredColumn]
        .toLowerCase()
        .includes(searchedVal.toLowerCase())
    })
    setRows(filteredRows)
  }

  const handleChange = (e) => {
    setSearch(e)
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

  const changePlayerSkill = (playerNewSkill, playerId) => {
    props.handleChangeSelect(playerNewSkill, playerId)
  }

  const handleChangeSelected = (event, playerId) => {
    setSkill('')
    changePlayerSkill(event.target.value, playerId)
  }

  useEffect(() => {
    setRows(rowsData)
  }, [rowsData])

  useEffect(() => {
    if (props.autorows) {
      setRowsPerPage(rows.length)
      setPage(0)
    }
  }, [rows])

  CustomPaginationActionsTable.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    buttonColor: PropTypes.string,
    buttonTitle: PropTypes.string,
    columns: PropTypes.array.isRequired,
    rowsPerPageOnStart: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    handleClick: PropTypes.func,
    handleChangeSelect: PropTypes.func,
    filteredColumn: PropTypes.string.isRequired,
    autorows: PropTypes.bool,
    selectSkill: PropTypes.bool
  }

  let levels = Array.apply(null, { length: 10 }).map(Number.call, Number)

  return (
    <>
      <StyledPaper>
        <WrapSearch>
          <StyledTypography variant="h5">{props.title}</StyledTypography>
          <StyledSearchBar
            align={'right'}
            placeholder="Szukaj"
            value={search}
            onChange={(searchVal) => {
              requestSearch(searchVal)
              handleChange(searchVal)
            }}
            onCancelSearch={() => cancelSearch()}
          />
        </WrapSearch>
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
                {props.selectSkill && (
                  <TableCell>
                    <FormControl>
                      <InputLabel htmlFor="poziom">Poziom</InputLabel>
                      <Select
                        style={{ width: 100 }}
                        id={row.id + 'select'}
                        native
                        value={skill}
                        onChange={() => handleChangeSelected(event, row.id)}>
                        <option aria-label="None" value="" />
                        {levels.map((arrLevel) => {
                          return (
                            <option
                              key={arrLevel + 1}
                              value={(arrLevel + 1).toString()}>
                              {arrLevel + 1}
                            </option>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </TableCell>
                )}
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
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage="wierszy na stronę"
                rowsPerPageOptions={[
                  props.autorows ? rows.length : props.rowsPerPageOnStart[0],
                  props.rowsPerPageOnStart[1],
                  props.rowsPerPageOnStart[2],
                  {
                    label: 'Wszystko',
                    value: -1
                  }
                ]}
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
