import {
  List,
  ListItem,
  ListItemText,
  Container,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'
import styled from 'styled-components'
import { NavLink, useRouteMatch } from 'react-router-dom'

const navLinks = [
  { title: `gry`, path: `/gry` },
  { title: `dodaj grę`, path: `/dodaj-gre` },
  { title: `dodaj gracza`, path: `/dodaj-gracza` },
  { title: `profil`, path: `/profil` },
  { title: `wyloguj`, path: `/wyloguj` }
]

const StyledAppBar = styled(AppBar)`
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  display: none;
  position: fixed;
  top: 0;
  background-image: ${({ theme }) => theme.palette.mainGradient.main};
  ${({ theme }) => `
   ${theme.breakpoints.up('sm')} {
       display: flex
   `}
`

const NavbarDisplayFlex = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavList = styled(List)`
  display: flex;
  justify-content: space-between;
`

const RouterNavLink = styled(NavLink)`
  text-decoration: none !important;
  color: white;
`

const Navbar = () => {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <NavbarDisplayFlex>
            <RouterNavLink exact to="/">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="logo"
                style={{ fontWeight: '700' }}>
                volley
              </IconButton>
            </RouterNavLink>
            <NavList component="nav" aria-labelledby="main navigation">
              {navLinks.map(({ title, path }) => (
                <RouterNavLink exact to={path} key={title}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </RouterNavLink>
              ))}
            </NavList>
          </NavbarDisplayFlex>
        </Toolbar>
      </StyledAppBar>
    </>
  )
}
export default Navbar
