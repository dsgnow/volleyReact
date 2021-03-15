import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core'

const StyledButton = (props) => {
  const StyledButton = styled(Button)`
    transition: 0.3s;
    /* ${({ theme }) => `
    {
       background-image: ${
         props.color === 'delete'
           ? theme.palette.secondaryGradient.main
           : theme.palette.mainGradient.main
       };
       &:hover {
        background-image: ${
          props.color === 'delete'
            ? theme.palette.secondaryGradient.darken
            : theme.palette.mainGradient.darken
        };
       } 
   `} */
    padding: 5px 20px;
    text-transform: none;
    outline: none;
    text-decoration: none;
    color: white;
    /* background-color: ${(props) => props.color}; */
  `

  return <StyledButton {...props}>{props.title}</StyledButton>
}

export default StyledButton
