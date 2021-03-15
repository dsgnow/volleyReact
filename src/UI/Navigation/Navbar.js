import {
  List,
  ListItem,
  ListItemText,
  Container,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
import styled from 'styled-components'

const navLinks = [
  { title: `dodaj grę`, path: `/dodaj-gre` },
  { title: `dodaj gracza`, path: `/dodaj-gracza` },
  { title: `profil`, path: `/edytuj` },
  { title: `wyloguj`, path: `/wyloguj` }
]

const StyledAppBar = styled(AppBar)`
  margin-bottom: 40px;
  width: 100%;
  display: none;
  top: 0;
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
       display: flex
   `}
`

const NavbarDisplayFlex = styled(Container)`
  display: flex;
  justify-content: space-between;
`

const NavList = styled(List)`
  display: flex;
  justify-content: space-between;
`

const NavLink = styled.a`
  text-decoration: none;
  color: white;
`

const Navbar = () => {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <NavbarDisplayFlex>
            <IconButton
              href={'/'}
              edge="start"
              color="inherit"
              aria-label="home">
              <Home fontSize="large" />
            </IconButton>
            <NavList component="nav" aria-labelledby="main navigation">
              {navLinks.map(({ title, path }) => (
                <NavLink href={path} key={title}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </NavLink>
              ))}
            </NavList>
          </NavbarDisplayFlex>
        </Toolbar>
      </StyledAppBar>
    </>
  )
}
export default Navbar
