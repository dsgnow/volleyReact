import { useContext, useState } from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './AddPlayersTable.module.scss';
import ReducerContext from '../../../context/ReducerContext';
import reducer from '../../../reducer';
import Table from '../Table';

const AddPlayersTable = (props) => {
  const context = useContext(ReducerContext);
  const [state, setState] = useState('');
  const initialState = [...context.state.allPlayers];
  const assignedPlayers = [...context.state.playersAssignedToGame];

  // initialState.forEach((el, i) => {
  //   el.add = (
  //     <MDBBtn add={el.id} onClick={() => clickHandler(el.id)} color={'primary'} size="sm">
  //       Dodaj gracza
  //     </MDBBtn>
  //   );
  // });

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
    rows: initialState
  };

  const clickHandler = (e) => {
    const filteredPlayer = context.state.allPlayers.filter((player) => player.id === e);
    props.addPlayer(filteredPlayer);
    console.log(filteredPlayer);
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
