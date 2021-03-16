import Games from '../../components/Games/Games'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 20px auto;
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
    flex-direction: row;
   `}
`

const StyledTypography = styled(Typography)`
  margin: 20px 0;
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
    margin: 60px 0;
   `}
`

const StartGames = () => {
  return (
    <>
      <StyledTypography variant="h3">Dostępne gry</StyledTypography>
      <StyledContainer maxWidth="md">
        <Games></Games>
      </StyledContainer>
    </>
  )
}

export default StartGames
