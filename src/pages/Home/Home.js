import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import volleyballPlayer from '../../Assets/Images/siatkarka.png'
import Button from '../../UI/Button/Button'

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  height: auto;
  margin-bottom: 30px;
  margin-top: 30px;
  ${({ theme }) => `
    {  
       ${theme.breakpoints.up('sm')} {
        flex-direction: row;
      }
   `}
`

const WrapImages = styled.div`
  height: 50vh;
  width: 100%;
  background-color: transparent;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      width: 60%;
      height: auto;
`}
`
const WrapTexts = styled.div`
  z-index: 999;
  height: auto;
  width: 100%;
  padding: 0 30px 30px;
  align-self: flex-start;
  text-align: left;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      padding: 50px 30px 30px;
      width: 50%;
      margin: 0 50px 0 100px;
    `}
`
const StyledDescription = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 300;
  margin: 30px 0;
  ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      font-size: 1.5rem;
      margin: 50px 0;
    `}
`

const Image = styled.img`
  height: 100%;
  ${({ theme }) => `
    {  
       ${theme.breakpoints.up('sm')} {
        height: 80vh;
        position: absolute;
        top:-250px;
        right:-40px;
      
      ${theme.breakpoints.up('md')} {
        right: 100px;
      }
   `}
`

const StyledButton = styled(Button)`
  width: 250px;
  font-size: 1.2rem;
`

const Home = () => {
  return (
    <>
      <StyledContainer>
        <WrapTexts>
          <Typography variant="h1">volley</Typography>
          <Typography style={{ fontWeight: 300 }} variant="h2">
            treningi siatkarskie
          </Typography>
          <StyledDescription variant="h3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sint
            esse voluptatem in veritatis? Quidem saepe expedita officiis
            sapiente eum suscipit, beatae nobis sit ex sint assumenda.
            Voluptatum, repudiandae quaerat.
          </StyledDescription>
          <StyledButton
            size="large"
            variant="contained"
            title="Dostępne mecze"
            color="secondary"></StyledButton>
        </WrapTexts>
        <WrapImages>
          <Image src={volleyballPlayer} alt="" />
        </WrapImages>
      </StyledContainer>
    </>
  )
}

export default Home
