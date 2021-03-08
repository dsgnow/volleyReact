import { useContext, useEffect } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import styles from './Table.module.scss';
import ReducerContext from '../../context/ReducerContext';

const Table = (props) => {
  const context = useContext(ReducerContext);

  const tableState = context.state.allPlayers;
  props.addbutton &&
    tableState.forEach((el, i) => {
      el.dodaj = (
        <MDBBtn id={el.id} color="primary" size="sm">
          Dodaj gracza
        </MDBBtn>
      );
    });

  const columns = props.columns;

  const data = {
    columns: columns,
    rows: context.state.allPlayers
  };

  return (
    <div className={styles.wrapTable}>
      <h2>{props.title}</h2>
      <MDBDataTable
        className={styles.tableWrap}
        infoLabel={['Pokazuje', 'do', 'z', 'wyników']}
        paginationLabel={['Poprzedni', 'Następny']}
        entriesLabel="Pokaż wyniki"
        searchLabel="Szukaj"
        data={data}
        {...props}
      />
      {/* <MDBBtn color="success">Zatwierdż</MDBBtn> */}
    </div>
  );
};

export default Table;
