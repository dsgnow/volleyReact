import { useContext } from 'react';
import { MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';
import styles from './GamePlayersTable.module.scss';
import Table from '../Table';
import TableUi from '../Table/Table';
import AddPlayersTable from './AddPlayersTable';
import useStateStorage from '../../../hooks/useStateStorage';
import ReducerContext from '../../../context/ReducerContext';
import cloneDeep from 'lodash/cloneDeep';

const GamePlayersTable = ({ title }) => {
  const context = useContext(ReducerContext);

  const [playersStorage, setPlayersStorage] = useStateStorage('players', null);

  let { playersAssignedToGame } = context.state.playersAssignedToGame;

  const tableData = cloneDeep(playersStorage);

  tableData &&
    tableData.forEach((el) => {
      el.delete = (
        <MDBBtn
          delete={el.id}
          onClick={() => removePlayer(el.id)}
          color={'warning'}
          size="sm">
          Usuń gracza
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
    rows: tableData
  };

  const addPlayer = (newPlayer) => {
    let checkIfPlayerExist;
    playersStorage
      ? (checkIfPlayerExist = playersStorage.filter(
          (el) => el.id === newPlayer[0].id
        ))
      : (checkIfPlayerExist = []);

    if (!checkIfPlayerExist.length > 0) {
      if (playersStorage && !playersAssignedToGame) {
        playersAssignedToGame = [...playersStorage, newPlayer[0]];
      } else {
        playersAssignedToGame = [
          ...context.state.playersAssignedToGame,
          newPlayer[0]
        ];
      }

      setPlayersStorage(playersAssignedToGame);
    }
  };

  const removePlayer = (playerId) => {
    const filteredPlayer = playersStorage.filter(
      (player) => player.id !== playerId
    );
    setPlayersStorage(filteredPlayer);
  };

  return (
    <>
      <TableUi />
      <div className={styles.wrapTable}>
        <AddPlayersTable addPlayer={addPlayer} />
        <h2>{title}</h2>
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
    </>
  );
};

GamePlayersTable.propTypes = {
  title: PropTypes.string
};

export default GamePlayersTable;
