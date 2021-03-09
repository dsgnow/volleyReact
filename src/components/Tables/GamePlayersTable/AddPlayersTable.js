import { useContext } from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './AddPlayersTable.module.scss';
import ReducerContext from '../../../context/ReducerContext';
import Table from '../Table';

const AddPlayersTable = (props) => {
  const context = useContext(ReducerContext);
  const tableState = context.state.allPlayers;

  tableState.forEach((el, i) => {
    el.add = (
      <MDBBtn add={el.id} color={'primary'} size="sm">
        Dodaj gracza
      </MDBBtn>
    );
  });

  const data = {
    columns: [
      {
        label: 'gracze',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'dodaj',
        field: 'add',
        sort: 'asc'
      }
    ],
    rows: tableState
  };

  return (
    <div className={styles.wrapTable}>
      <Table
        title={'Dodaj gracza'}
        paging={true}
        entries={1}
        entriesOptions={[1, 6, 24]}
        dark
        theadTextWhite
        tbodyTextWhite
        addbutton={'true'}
        buttonaction={'add'}
        data={data}
      />
    </div>
  );
};

export default AddPlayersTable;
