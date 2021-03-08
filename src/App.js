import { useReducer, useEffect } from 'react';
import { reducer, intialState } from './reducer';
import ReducerContext from './context/ReducerContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import GlobalStyle from './theme/createGlobalStyle';
import './App.css';
import Header from '../src/components/Header/Header';
import { MDBBtn } from 'mdbreact';
import Table from './components/Tables/Table';

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
          <Table
            title={'Dodani gracze do gry'}
            paging={true}
            entries={5}
            entriesOptions={[5, 12, 24]}
            striped
            bordered
            small
            responsive
            noBottomColumns
            columns={[
              {
                label: 'gracze',
                field: 'name',
                sort: 'asc'
              },
              {
                label: 'skill',
                field: 'skill',
                sort: 'asc'
              }
            ]}
            addbutton={'false'}
          />
          <Table
            title={'Dodaj gracza'}
            paging={true}
            entries={1}
            entriesOptions={[1, 6, 24]}
            striped
            bordered
            small
            responsive
            noBottomColumns
            btn
            dark
            theadTextWhite
            tbodyTextWhite
            columns={[
              {
                label: 'gracze',
                field: 'name',
                sort: 'asc'
              },
              {
                label: 'dodaj',
                field: 'dodaj',
                sort: 'asc'
              }
            ]}
            addbutton={'true'}
          />
        </main>
      </ReducerContext.Provider>
    </div>
  );
}

export default App;
