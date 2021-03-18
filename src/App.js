import { useReducer, Suspense } from 'react'
import { reducer, intialState } from './reducer'
import ReducerContext from './context/ReducerContext'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
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
    background: {
      default: '#ffffff'
    },
    primary: {
      light: '#58a5ef',
      main: '#0277bc',
      dark: '#004c8b',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#ffffff'
    },
    mainGradient: {
      main: 'linear-gradient(to right, #0277bc, #004c8b)',
      darken: 'linear-gradient(to right, #021b79, #0575e6)'
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
          {/* <AuthenticatedRoute path="/profil/hotele/dodaj" component={AddHotel} />
            <AuthenticatedRoute path="/profil" component={Profile} /> */}
          <Route path="/gry/składy/:id" component={GameComposition} />
          <Route path="/gry" component={StartGames} />
          <Route path="/dodaj-gracza" component={AddPlayersToGame} />
          {/* <Route path="/zaloguj" component={} />
          <Route path="/rejestracja" component={Register} /> */}
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
      </Router>
    </div>
  )
}

export default App
