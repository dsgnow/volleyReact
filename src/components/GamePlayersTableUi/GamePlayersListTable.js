import { useContext } from 'react';
import PropTypes from 'prop-types';
import ReducerContext from '../../context/ReducerContext';
import useStateStorage from '../../hooks/useStateStorage';
import Table from '../Tables/Table/Table';
import cloneDeep from 'lodash/cloneDeep';
import AddPlayersTable from './AddPlayersTable';
import { StyledTableContainer } from '../Tables/Table/TableStyled';
import { useTheme } from '@material-ui/core/styles';

const GamePlayersTable = ({ title }) => {
  const context = useContext(ReducerContext);
  const theme = useTheme();

  const changePlayersAssignedToGame = (e) => {
    context.dispatch({ type: 'changePlayersAssignedToGame', value: e });
  };

  const [playersStorage, setPlayersStorage] = useStateStorage('players', null);

  let { playersAssignedToGame } = context.state.playersAssignedToGame;

  const tableData = cloneDeep(playersStorage);

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
      changePlayersAssignedToGame(playersAssignedToGame);
    }
  };

  const removePlayer = (playerId) => {
    const filteredPlayer = playersStorage.filter(
      (player) => player.id !== playerId
    );
    setPlayersStorage(filteredPlayer);
    changePlayersAssignedToGame(filteredPlayer);
  };

  return (
    <StyledTableContainer>
      <AddPlayersTable addPlayer={addPlayer} />
      <Table
        title={'Gracze dodani do gry'}
        data={tableData ? tableData : []}
        handleClick={(playerId) => removePlayer(playerId)}
        buttonTitle={'Usuń gracza'}
        buttonColor={'secondary'}
        rowsPerPageOnStart={[3, 12, 24]}
      />
    </StyledTableContainer>
  );
};

GamePlayersTable.propTypes = {
  title: PropTypes.string
};

export default GamePlayersTable;
