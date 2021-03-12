import styled, { css } from 'styled-components';

export const StyledTableContainer = styled.p`
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
       background-color: red; 
   `}
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

export const StyledPaper = styled.p`
  width: 100%;
  margin: 5px auto;
  padding: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  margin-bottom: 40px;

  @media (min-width: 800px) {
    width: 60%;
  }
`;

export const Paragraph = styled.p`
  font-size: 14px;
  line-height: 18px;
  color: red;
  margin-bottom: 20px;
`;
