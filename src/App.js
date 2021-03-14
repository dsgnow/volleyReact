import { useReducer, useEffect } from 'react';
import { reducer, intialState } from './reducer';
import ReducerContext from './context/ReducerContext';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Header from '../src/components/Header/Header';
import GamePlayersTable from './components/GamePlayersTableUi/GamePlayersListTable';
import styled, { ThemeProvider } from 'styled-components';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  palette: {
    add: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f'
    },
    delete: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162'
    },
    error: {
      main: '#f44336'
    },
    mainGradient: {
      main: 'linear-gradient(to right, #0575e6, #021b79)',
      darken: 'linear-gradient(to right, #021b79, #0575e6)'
    },
    secondaryGradient: {
      main: 'linear-gradient(to right, #ed213a, #93291e)',
      darken: 'linear-gradient(to right, #93291e, #ed213a)'
    }
  },
  root: {},
  status: {
    danger: 'red'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto'
        }
      }
    }
  }
});

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

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
            <Header />
            <main>
              <GamePlayersTable />
            </main>
          </ReducerContext.Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
