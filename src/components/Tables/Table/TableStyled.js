import styled, { css } from 'styled-components';
import { TableContainer, Paper } from '@material-ui/core';

export const StyledTableContainer = styled(TableContainer)`
  /* ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
       background-color: red; 
   `} */
  width: 95%;
  margin: 5px auto;
  padding: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  margin-bottom: 40px;

  @media (min-width: 800px) {
    width: 90%;
    padding: 50px;
    margin: 50px auto;
    margin-bottom: 100px;
  }
`;

export const StyledPaper = styled(Paper)`
  width: 100%;
  margin: 5px auto;
  padding: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  margin-bottom: 40px;

  @media (min-width: 800px) {
    width: 60%;
  }
`;

export const H2 = styled.h1`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 20px;

  @media (min-width: 800px) {
    font-size: 30px;
    margin-bottom: 50px;
  }
`;
