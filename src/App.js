import { useReducer, useEffect } from 'react';
import { reducer, intialState } from './reducer';
import ReducerContext from './context/ReducerContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import GlobalStyle from './theme/createGlobalStyle';
import './App.css';
import Header from '../src/components/Header/Header';
import { MDBBtn } from 'mdbreact';
import Table from './components/Tables/Table';
import GamePlayersTable from './components/Tables/GamePlayersTable/GamePlayersTable';

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <div className="App">
      <GlobalStyle />
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
    </div>
  );
}

export default App;
