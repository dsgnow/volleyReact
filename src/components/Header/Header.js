import { useContext } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import ReducerContext from '../../context/ReducerContext'
import Navbar from '../../UI/Navigation/Navbar'
import headerImage from '../../Assets/Images/headerImage2.jpg'

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

// const StyledHeader = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 35vh;
//   color: white;
//   background: url(${headerImage}) no-repeat center left;
//   background-size: contain;
//   margin-bottom: 70px;
//   ${({ theme }) => `
//     {
//        ${theme.breakpoints.down('sm')} {
//         margin-bottom: 20px;
//         padding: 20px 0 20px;
//       }
//    `}
// `

const Header = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* <Typography variant="h1">volley</Typography>
          <Typography style={{ fontWeight: 300 }} variant="h2">
            rozgrywki siatkarskie
          </Typography> */}
      </div>
    </>
  )
}

export default Header
