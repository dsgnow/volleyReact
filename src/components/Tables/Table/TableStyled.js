import styled from 'styled-components'
import { TableContainer, Paper, Typography, TableHead } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'

export const StyledTableContainer = styled(TableContainer)`
  /* ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
       background-color: red; 
   `} */
  /* background: ${({ theme }) => theme.primaryDark};  */
  position: relative;
  width: 100%;
  margin: 5px auto;
  padding: 25px;
  background-color: #fafafa;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (min-width: 800px) {
    width: 90%;
    padding: 0;
    margin: 0 auto;
    margin-bottom: 100px;
  }
`

export const StyledSearchBar = styled(SearchBar)`
  box-shadow: rgba(0, 33, 72, 0.2) -4px 9px 25px -6px;
  margin-bottom: 30px;
  width: 50%;
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
  overflow-x: auto;
  width: 90%;
  margin: 20px auto;
  padding: 25px 10px;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  @media (min-width: 800px) {
    width: 80%;
    margin: 40px auto;
    padding: 30px 30px;
  }
`

export const WrapSearch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
   `}
`

export const StyledTypography = styled(Typography)`
  font-weight: 700;
  margin-bottom: 30px;
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
    margin-bottom: 20px;
   `}
`
