import { useState } from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './GamePlayersTable.module.scss';
import Table from '../Table';
import AddPlayersTable from './AddPlayersTable';
import useStateStorage from '../../../hooks/useStateStorage';

const GamePlayerTable = (props) => {
  const [players, setPlayers] = useState('');
  const tableState = [...players];

  // tableState &&
  //   tableState.forEach((el, i) => {
  //     el.delete = (
  //       <MDBBtn delete={el.id} onClick={() => removePlayer(el.id)} color={'warning'} size="sm">
  //         Usuń gracza
  //       </MDBBtn>
  //     );
  //   });

  const data = {
    columns: [
      {
        label: 'gracze',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'skill',
        field: 'skill',
        sort: 'asc'
      },
      {
        label: 'usuń',
        field: 'delete',
        sort: 'asc'
      }
    ],
    rows: tableState
  };

  const test = [
    {
      label: 'gracze',
      field: 'name',
      sort: 'asc'
    },
    {
      label: 'skill',
      field: 'skill',
      sort: 'asc'
    },
    {
      label: 'usuń',
      field: 'delete',
      sort: 'asc'
    }
  ];

  const addPlayer = (player) => {
    console.log(player);
    setPlayers([...tableState, player[0]]);
    // window.localStorage.setItem('dupa', JSON.stringify(test));
  };

  const removePlayer = (playerId) => {
    const filteredPlayer = tableState.filter((player) => player.id !== playerId);
    setPlayers(filteredPlayer);
  };

  return (
    <div className={styles.wrapTable}>
      <AddPlayersTable addPlayer={addPlayer} />
      <h2>{props.title}</h2>
      <Table
        title={'Dodani gracze do gry'}
        paging={true}
        entries={5}
        entriesOptions={[5, 12, 24]}
        addbutton={'true'}
        buttonaction={'delete'}
        data={data}
      />
    </div>
  );
};

export default GamePlayerTable;
