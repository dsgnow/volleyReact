import { useState, useEffect } from 'react'
import {
  useLocation,
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import { StyledContainer as Container } from '../../Assets/Styles/GlobalStyles'
import { ProfileDetails } from './ProfileDetails/ProfileDetails'
import AssignedGames from './AssignedGames/AssignedGames'
import AddedGames from './AddedGames/AddedGames'
import useStateStorage from '../../hooks/useStateStorage'

export default function Profile() {
  const { path, url } = useRouteMatch()

  const Test = () => {
    return <div>Hello</div>
  }

  const [value, setValue] = useStateStorage('actualPage', 0)

  const location = useLocation()

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue)
  }

  const StyledContainer = styled(Container)`
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    background-color: white;
    border-radius: unset;
  `

  const StyledTabs = styled(Tabs)``

  const StyledTab = styled(Tab)`
    font-weight: 700;
    font-size: 0.7rem;
    @media (min-width: 600px) {
      font-size: 0.9rem;
    }
  `

  useEffect(() => {
    location.pathname == '/profil' && setValue(0)
  }, [location])

  return (
    <>
      <StyledContainer>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered>
          <StyledTab label="profil" to={`${url}`} component={NavLink} />
          <StyledTab
            label="Biorę udział"
            to={`${url}/gry-udział`}
            component={NavLink}
          />
          <StyledTab
            label="dodane gry"
            to={`${url}/gry-dodane`}
            component={NavLink}
          />
        </StyledTabs>
      </StyledContainer>
      <Switch>
        <Route path={`${path}/gry-udział`} component={AssignedGames} />
        <Route path={`${path}/gry-dodane`} component={AddedGames} />
        <Route path={`${path}`} component={ProfileDetails} />
      </Switch>
    </>
  )
}
