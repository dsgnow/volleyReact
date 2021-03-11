import { useReducer, useEffect } from 'react';
import { reducer, intialState } from './reducer';
import ReducerContext from './context/ReducerContext';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Header from '../src/components/Header/Header';
import { MDBBtn } from 'mdbreact';
import Table from './components/Tables/Table';
import GamePlayersTable from './components/Tables/GamePlayersTable/GamePlayersTable';

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
    </div>
  );
}

export default App;
