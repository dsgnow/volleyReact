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
import { NavLink } from 'react-router-dom'
import Drawer from './Drawer'
import useAuth from '../../hooks/useAuth'

const navLinks = [
  { title: `gry`, path: `/gry`, authRequired: true },
  { title: `dodaj grę`, path: `/dodaj-gre`, authRequired: true },
  {
    title: `dodaj gracza`,
    path: `/dodaj-gracza`,
    adminAuthRequired: true,
    authRequired: true
  },
  { title: `profil`, path: `/profil`, authRequired: true },
  { title: `logowanie`, path: `/logowanie`, authRequired: false },
  { title: `wyloguj`, path: `/`, authRequired: true }
]

const StyledAppBar = styled(AppBar)`
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  display: none;
  position: fixed;
  top: 0;
  background-image: ${({ theme }) => theme.palette.mainGradient.main};
  @media (min-width: 600px) {
    display: flex;
  }
`

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  @media (min-width: 600px) {
    display: none;
  }
`

const StyledDrawer = styled(Drawer)`
  margin: 300px;
  padding: 300px;
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
  const [auth, authAdmin, setAuth] = useAuth()
  const logout = () => {
    setAuth(false)
  }

  return (
    <>
      <Wrapper>
        <StyledDrawer></StyledDrawer>
      </Wrapper>
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
              {navLinks.map(
                ({ title, path, authRequired, adminAuthRequired }) => (
                  <div key={title}>
                    {auth && !adminAuthRequired && title !== 'logowanie' ? (
                      <RouterNavLink exact to={path}>
                        <ListItem
                          button
                          onClick={title === 'wyloguj' ? logout : null}>
                          <ListItemText primary={title} />
                        </ListItem>
                      </RouterNavLink>
                    ) : null}
                    {!auth && !authRequired && !adminAuthRequired ? (
                      <RouterNavLink exact to={path}>
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </RouterNavLink>
                    ) : null}
                    {authAdmin && authRequired && adminAuthRequired ? (
                      <RouterNavLink exact to={path}>
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </RouterNavLink>
                    ) : null}
                  </div>
                )
              )}
            </NavList>
          </NavbarDisplayFlex>
        </Toolbar>
      </StyledAppBar>
    </>
  )
}
export default Navbar
