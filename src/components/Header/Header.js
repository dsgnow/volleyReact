import { useContext } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import ReducerContext from '../../context/ReducerContext'
import Navbar from '../../UI/Navigation/Navbar'

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: white;
  padding: 20px 0 40px;
  height: auto;
  ${({ theme }) => `
    {
       background-image: ${theme.palette.mainGradient.main};
   `}
`

const Header = (props) => {
  const context = useContext(ReducerContext)
  const changePlayer = () => {
    context.dispatch({ type: 'changePlayer' })
  }
  return (
    <>
      <StyledHeader>
        <Navbar />
        <div>
          <Typography variant="h2">
            Siatkówka {context.state.gamePlace}
          </Typography>
          <Typography variant="h3">{context.state.gameDate}</Typography>
        </div>
      </StyledHeader>
    </>
  )
}

export default Header
