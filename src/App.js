import { useReducer, useEffect } from 'react';
import { reducer, intialState } from './reducer';
import ReducerContext from './context/ReducerContext';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Header from '../src/components/Header/Header';
import { MDBBtn } from 'mdbreact';
import Table from './components/Tables/Table';
import GamePlayersTable from './components/Tables/GamePlayersTable/GamePlayersTable';
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
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    }
  },
  root: {
    mainGradient:
      'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
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
  const [state, dispatch] = useReducer(
    reducer,
    intialState
  );

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReducerContext.Provider
            value={{
              state: state,
              dispatch: dispatch
            }}
          >
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
