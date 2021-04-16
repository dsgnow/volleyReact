import { useReducer, Suspense } from 'react'
import { reducer, intialState } from './reducer'
import ReducerContext from './context/ReducerContext'
import AuthContext from './context/authContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthenticatedRoute from './hoc/AuthenticatedRoute'
import CssBaseline from '@material-ui/core/CssBaseline'
import './App.css'
import Header from '../src/components/Header/Header'
import StartGames from './pages/StartGames/StartGames'
import AddPlayersToGame from '../src/pages/admin/AddPlayersToGame/AddPlayersToGame'
import GameComposition from '../src/pages/GameComposition/GameComposition'
import Home from './pages/Home/Home'
import Layout from './components/Layout/Layout'
import NotFound from './pages/404/404'
import { ThemeProvider } from 'styled-components'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes
} from '@material-ui/core/styles'
import Profile from './pages/Profile/Profile/Profile'
import AddGame from './pages/AddGame/AddGame'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '5rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 500
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500
    }
  },
  palette: {
    // background: {
    //   default: '#ffffff'
    // },
    primary: {
      light: '#003c77',
      main: '#002046',
      dark: '#000e1c',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#fc4783',
      main: '#ff2362',
      dark: '#bd1a48',
      contrastText: '#ffffff'
    },
    mainGradient: {
      main: 'linear-gradient(to right, #002046, #004c8b)',
      darken: 'linear-gradient(to right, #021b79, #0575e6)'
    },
    grey: {
      main: '#fafafa'
    },
    shadow: {
      main: 'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px'
    }
  }
})
theme = responsiveFontSizes(theme)

function App() {
  const [state, dispatch] = useReducer(reducer, intialState)

  const header = <Header />
  const content = (
    <main>
      {/* <ErrorBoundary> */}
      <Suspense fallback={<p>Ładowanie...</p>}>
        <Switch>
          <AuthenticatedRoute path="/profil" component={Profile} />
          <AuthenticatedRoute
            path="/gry/składy/:id"
            component={GameComposition}
          />
          <AuthenticatedRoute path="/gry" component={StartGames} />
          <AuthenticatedRoute
            path="/dodaj-gracza"
            component={AddPlayersToGame}
          />
          <AuthenticatedRoute path="/dodaj-gre" component={AddGame} />
          <Route path="/logowanie" component={Login} />
          <Route path="/rejestracja" component={Register} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      {/* </ErrorBoundary> */}
    </main>
  )

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider
          value={{
            user: state.user,
            login: (user) => dispatch({ type: 'login', user }),
            logout: () => dispatch({ type: 'logout' })
          }}>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ReducerContext.Provider
                value={{
                  state: state,
                  dispatch: dispatch
                }}>
                <Layout header={header} content={content} />
              </ReducerContext.Provider>
            </ThemeProvider>
          </MuiThemeProvider>
        </AuthContext.Provider>
      </Router>
    </div>
  )
}

export default App
