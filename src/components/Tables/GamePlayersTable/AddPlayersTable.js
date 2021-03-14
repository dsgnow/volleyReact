import { useContext } from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './AddPlayersTable.module.scss';
import ReducerContext from '../../../context/ReducerContext';
import Table from '../Table';
import cloneDeep from 'lodash/cloneDeep';

const AddPlayersTable = (props) => {
  const context = useContext(ReducerContext);
  const { allPlayers } = context.state;
  const tableData = cloneDeep(allPlayers);

  tableData.forEach((el, i) => {
    el.add = (
      <MDBBtn
        add={el.id}
        onClick={() => clickHandler(el.id)}
        color={'primary'}
        size="sm">
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
    rows: tableData
  };

  const clickHandler = (e) => {
    const filteredPlayer = allPlayers.filter((player) => player.id === e);
    props.addPlayer(filteredPlayer);
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
