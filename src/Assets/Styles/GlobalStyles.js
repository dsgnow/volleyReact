import styled from 'styled-components'
import { Container, Typography } from '@material-ui/core'

export const StyledContainer = styled.div`
  width: 95%;
  margin: 40px auto;
  padding: 0 0 20px 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;

  @media (min-width: 800px) {
    width: 90%;
    padding: 0 0 20px 0;
    margin: 50px auto;
  }
`

export const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: ${({ theme }) => theme.palette.mainGradient.main};
  color: white;
  margin: 0 auto;
  width: 100%;
  height: 100px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      height: 110px;
    `}
`

export const StyledTitleTypography = styled(Typography)`
  /* margin: 20px 0;
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
    margin: 60px 0;
   `} */
`
