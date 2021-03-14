import { MDBDataTable } from 'mdbreact';
import styles from './Table.module.scss';

const Table = (props) => {
    return (
        <>
            <h2>{props.title}</h2>
            <MDBDataTable
                infoLabel={['Pokazuje', 'do', 'z', 'wyników']}
                paginationLabel={['Poprzedni', 'Następny']}
                entriesLabel="Pokaż wyniki"
                searchLabel="Szukaj"
                striped
                bordered
                small
                responsive
                noBottomColumns
                btn
                {...props}
            />
        </>
    );
};

export default Table;
