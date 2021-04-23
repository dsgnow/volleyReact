import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import volleyballPlayer from '../../Assets/Images/siatkarka.png'
import Button from '../../UI/Button/Button'
import { useHistory } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  height: auto;
  margin-bottom: 30px;
  margin-top: 30px;
  max-width: 100vw;
  overflow: hidden;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`

const WrapImages = styled.div`
  height: 50vh;
  width: 100%;
  @media (orientation: landscape) {
    display: none;
  }
  @media (min-width: 800px) {
    width: 30%;
    height: auto;
    display: inline;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
`

const WrapTexts = styled.div`
  z-index: 999;
  height: auto;
  width: 100%;
  padding: 0 30px 30px;
  text-align: left;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: flex-start;
    padding: 50px 0;
    width: 80%;
    margin: 0 auto;
  }
`
const StyledDescription = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 300;
  margin: 30px 0;
  @media (min-width: 800px) {
    width: 50%;
    font-size: 1.5rem;
    margin: 50px 0;
  }
`

const Image = styled.img`
  height: 100%;
  @media (min-width: 800px) {
    height: 80vh;
    position: absolute;
    top: 7vh;
    right: -40px;
  }

  @media (min-width: 1200px) {
    right: 20vw;
  }
`

const StyledButton = styled(Button)`
  width: 250px;
  font-size: 1.2rem;
`

const Home = () => {
  const history = useHistory()
  const [auth] = useAuth()

  const routeChange = (path) => {
    history.push(path)
  }

  return (
    <>
      <StyledContainer>
        <Wrapper>
          <WrapTexts>
            <Typography variant="h1">volley</Typography>
            <Typography style={{ fontWeight: 300 }} variant="h2">
              treningi siatkarskie
            </Typography>
            <StyledDescription variant="h3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              sint esse voluptatem in veritatis? Quidem saepe expedita officiis
              sapiente eum suscipit, beatae nobis sit ex sint assumenda.
              Voluptatum, repudiandae quaerat.
            </StyledDescription>
            {auth ? (
              <StyledButton
                size="large"
                variant="contained"
                title="Dostępne mecze"
                onClick={() => routeChange('gry')}
                color="secondary"></StyledButton>
            ) : (
              <StyledButton
                size="large"
                variant="contained"
                title="Zaloguj się"
                onClick={() => routeChange('logowanie')}
                color="secondary"></StyledButton>
            )}
          </WrapTexts>
        </Wrapper>
        <WrapImages>
          <Image src={volleyballPlayer} alt="" />
        </WrapImages>
      </StyledContainer>
    </>
  )
}

export default Home
