import { useReducer } from 'react'
import { reducer, intialState } from './reducer'
import ReducerContext from './context/ReducerContext'
import // BrowserRouter as Router,
// Route,
// Switch,
// Redirect
'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import './App.css'
import Header from '../src/components/Header/Header'
import StartGames from './pages/StartGames/StartGames'
import AddPlayersToGame from '../src/pages/admin/AddPlayersToGame/AddPlayersToGame'
import GameComposition from '../src/pages/GameComposition/GameComposition'
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
      fontWeight: 700
    },
    h2: {
      fontWeight: 500
    },
    h3: {
      fontWeight: 500
    },
    h4: {
      fontWeight: 500
    }
  },
  palette: {
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

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReducerContext.Provider
            value={{
              state: state,
              dispatch: dispatch
            }}>
            {/* <Header /> */}
            <main>
              {/* <StartGames /> */}
              {/* <AddPlayersToGame /> */}
              <GameComposition />
            </main>
          </ReducerContext.Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </div>
  )
}

export default App
