import { Container, Typography } from '@material-ui/core'
import styled from 'styled-components'
import volleyballPlayer from '../../Assets/Images/siatkarka.jpg'

const WrapImage = styled.div`
  position: relative;
  width: 500px;
  height: 800px;
`

const Image = styled.img`
  width: 50%;
`

const Home = () => {
  return (
    <>
      <Container>
        <Typography variant="h2">Zapisz się na trening siatkarski!</Typography>
        <WrapImage>
          <Image src={volleyballPlayer} alt="" />
        </WrapImage>
      </Container>
    </>
  )
}

export default Home
