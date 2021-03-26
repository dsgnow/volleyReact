import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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
  const [state, setState] = React.useState({
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
    { title: `gry`, path: `/gry` },
    { title: `dodaj grę`, path: `/dodaj-gre` },
    { title: `dodaj gracza`, path: `/dodaj-gracza` },
    { title: `profil`, path: `/profil` },
    { title: `logowanie`, path: `/logowanie` },
    { title: `wyloguj`, path: `/wyloguj` }
  ]

  const list = (anchor) => (
    <WrapList
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <StyledListHead></StyledListHead>
      <Divider />
      <StyledList component="nav" aria-labelledby="main navigation">
        {navLinks.map(({ title, path }) => (
          <RouterNavLink exact to={path} key={title}>
            <StyledListItem button>
              <ListItemText primary={title} />
            </StyledListItem>
          </RouterNavLink>
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
          onClick={toggleDrawer('right', true)}>
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
