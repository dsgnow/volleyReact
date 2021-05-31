import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const StyledContainer = styled.div`
  width: 95%;
  margin: 20px auto;
  padding: 0 0 20px 0;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px; */
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: white;

  @media (min-width: 800px) {
    width: 90%;
    padding: 0 0 20px 0;
    margin: 80px auto;
  }
`

export const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px 8px 0 0;
  background-image: ${({ theme }) => theme.palette.mainGradient.main};
  color: white;
  margin: 0 auto 20px;
  width: 100%;
  height: 80px;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      margin: 0 auto 50px;
      padding: 10px;
      height: 100px;
    `}
`

export const StyledTitleTypography = styled(Typography)`
  font-weight: 500;
  /* margin: 20px 0;
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
    margin: 60px 0;
   `} */
`
