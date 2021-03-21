import { useState } from 'react'
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import { StyledContainer as Container } from '../../Assets/Styles/GlobalStyles'
import { ProfileDetails } from './ProfileDetails/ProfileDetails'

export default function Profile(props) {
  const { path, url } = useRouteMatch()

  const Test = () => {
    return <div>Hello</div>
  }

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const StyledContainer = styled(Container)`
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
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

  return (
    <>
      <StyledContainer>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered>
          <StyledTab label="profil" exact to={`${url}`} component={NavLink} />
          <StyledTab
            label="Biorę udział"
            exact
            to={`${url}/gry-udział`}
            component={NavLink}
          />
          <StyledTab
            label="dodane gry"
            exact
            to={`${url}/gry-dodane`}
            component={NavLink}
          />
        </StyledTabs>
      </StyledContainer>
      <Switch>
        <Route path={`${path}/gry-udział`} component={Test} />
        <Route path={`${path}/gry-dodane`} component={Test} />
        <Route path={`${path}`} component={ProfileDetails} />
      </Switch>
    </>
  )
}
