import { useContext } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import ReducerContext from '../../context/ReducerContext'
import Navbar from '../../UI/Navigation/Navbar'
import headerImage from '../../Assets/Images/headerImage.jpg'

// const styledHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 20vh;
//   color: red;
//   background-color: 'red';
//   /* ${({ theme }) => `
//     {
//        background-image: ${theme.palette.mainGradient.main}
//    `} */
// `;

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35vh;
  color: white;
  background: url(${headerImage}) no-repeat center center;
  background-size: cover;
  ${({ theme }) => `
    {
    
       ${theme.breakpoints.down('sm')} {
        padding: 20px 0 20px;
      }
   `}
`

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Navbar />
        <div>
          <Typography variant="h2">volley</Typography>
          <Typography variant="h4">rozgrywki siatkarskie</Typography>
        </div>
      </StyledHeader>
    </>
  )
}

export default Header
