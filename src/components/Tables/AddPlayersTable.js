import { useContext } from 'react';
import ReducerContext from '../../context/ReducerContext';
import Table from '../Tables/Table/Table';
import cloneDeep from 'lodash/cloneDeep';
import { useTheme } from '@material-ui/core/styles';

const AddPlayersTable = (props) => {
  const context = useContext(ReducerContext);
  const theme = useTheme();
  const { allPlayers } = context.state;
  const tableData = cloneDeep(allPlayers);

  const addPlayer = (e) => {
    const filteredPlayer = allPlayers.filter((player) => player.id === e);
    props.addPlayer(filteredPlayer);
  };

  return (
    <>
      <Table
        title={'Dodaj gracza'}
        data={tableData}
        handleClick={(playerId) => addPlayer(playerId)}
        buttonTitle={'Dodaj gracza'}
        buttonColor={'primary'}
        rowsPerPageOnStart={[1, 6, 12]}
      />
    </>
  );
};

export default AddPlayersTable;
