import styled, { css } from 'styled-components'
import { TableContainer, Paper, Typography, TableHead } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'

export const StyledTableContainer = styled(TableContainer)`
  /* ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
       background-color: red; 
   `} */
  /* background: ${({ theme }) => theme.primaryDark};  */
  width: 95%;
  margin: 5px auto;
  padding: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 800px) {
    width: 90%;
    padding: 50px;
    margin: 50px auto;
    margin-bottom: 100px;
  }
`

export const StyledSearchBar = styled(SearchBar)`
  box-shadow: rgba(149, 157, 165, 0.2) 0 4px 12px;
  margin-bottom: 30px;
  width: 100%;
  margin-left: auto;

  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
    width: 30%;
    margin-bottom: 20px;
   `}
`

export const StyledTableHead = styled(TableHead)`
  font-weight: 700;
  text-transform: uppercase;
  background-color: #fafafa;
`

export const StyledPaper = styled(Paper)`
  width: 100%;
  margin: 20px auto;
  padding: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

  @media (min-width: 800px) {
    width: 60%;
    margin: 40px auto;
  }
`

export const H2 = styled(Typography)`
  margin-bottom: 25px;

  @media (min-width: 800px) {
    margin-bottom: 25px;
  }
`
