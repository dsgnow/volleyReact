import { useState } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Wrapper = styled.div`
  margin: 10px;
`
const WrapList = styled.div`
  width: 50vw;
`

const StyledListHead = styled(List)`
  margin-top: 35px;
`

const StyledList = styled(List)`
  width: 80%;
  margin: 0 auto;
`

const StyledListItem = styled(ListItem)`
  text-align: center;
  background-image: ${({ theme }) => theme.palette.mainGradient.main};
  margin: 10px auto;
  padding: 5px;
`

const RouterNavLink = styled(NavLink)`
  text-decoration: none !important;
  color: white;
`

const Drawer = () => {
  const [auth, authAdmin, setAuth] = useAuth()
  const logout = () => {
    setAuth(false)
  }
  const [state, setState] = useState({
    right: false
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const navLinks = [
    { title: `start`, path: `/`, authRequired: false },
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

  const list = (anchor) => (
    <WrapList
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <StyledListHead />
      <Divider />
      <StyledList component="nav" aria-labelledby="main navigation">
        {navLinks.map(({ title, path, authRequired, adminAuthRequired }) => (
          <div key={title}>
            {auth && !adminAuthRequired && title !== 'logowanie' ? (
              <RouterNavLink exact to={path}>
                <StyledListItem
                  button
                  onClick={title === 'wyloguj' ? logout : null}>
                  <ListItemText primary={title} />
                </StyledListItem>
              </RouterNavLink>
            ) : null}
            {!auth && !authRequired && !adminAuthRequired ? (
              <RouterNavLink exact to={path}>
                <StyledListItem button>
                  <ListItemText primary={title} />
                </StyledListItem>
              </RouterNavLink>
            ) : null}
            {authAdmin && authRequired && adminAuthRequired ? (
              <RouterNavLink exact to={path}>
                <StyledListItem button>
                  <ListItemText primary={title} />
                </StyledListItem>
              </RouterNavLink>
            ) : null}
          </div>
        ))}
      </StyledList>
    </WrapList>
  )

  return (
    <div>
      <Wrapper>
        <Button
          size="small"
          fullWidth
          variant="contained"
          color="primary"
          onClick={toggleDrawer('right', !state.right)}>
          {'menu'}
        </Button>
        <SwipeableDrawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}>
          {list('right')}
        </SwipeableDrawer>
      </Wrapper>
    </div>
  )
}

export default Drawer
