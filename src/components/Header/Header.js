import { useContext } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import ReducerContext from '../../context/ReducerContext'
import Navbar from '../../UI/Navigation/Navbar'
import headerImage from '../../Assets/Images/headerImage3.png'

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  max-width: 100vw;
  overflow: hidden;
  color: white;
  background: url(${headerImage}) no-repeat center left;
  background-size: contain;
  background-image: ${({ theme }) => theme.palette.mainGradient.main};
  @media (min-width: 600px) {
    height: 35vh;
    margin-top: 50px;
  }
`

const HeaderImage = styled.img`
  height: 100%;
  margin-left: auto;
`

const HeaderText = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 700;
  @media (orientation: landscape) {
    font-size: 1.3rem;
  }
  @media (min-width: 800px) {
    font-size: 2.5rem;
  }
`

const WrapHeaderTexts = styled.div`
  z-index: 999;
  position: absolute;
  left: 8vw;
  padding-left: 20px;
  text-align: left;
  border-left: 7px solid white;
`

const Header = () => {
  return (
    <>
      <Navbar />
      <StyledHeader>
        <HeaderImage src={headerImage} alt="" />
        <WrapHeaderTexts>
          <HeaderText display="block" variant="body1">
            dodaj grę,
          </HeaderText>
          <HeaderText display="block" variant="body1">
            dobierz graczy,
          </HeaderText>
          <HeaderText display="block" variant="body1">
            stwórz drużyny
          </HeaderText>
        </WrapHeaderTexts>
      </StyledHeader>
    </>
  )
}

export default Header
