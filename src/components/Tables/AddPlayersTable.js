import { useContext } from 'react'
import ReducerContext from '../../context/ReducerContext'
import Table from '../Tables/Table/Table'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'

const AddPlayersTable = (props) => {
  const context = useContext(ReducerContext)
  const { allPlayers } = context.state
  const tableData = cloneDeep(allPlayers)

  const addPlayer = (e) => {
    const filteredPlayer = allPlayers.filter((player) => player.id === e)
    props.addPlayer(filteredPlayer)
  }

  return (
    <>
      <Table
        label={'Dodaj zawodników do gry'}
        tableHeaders={['gracz', 'dodaj']}
        columns={['name']}
        title={'Dodaj gracza'}
        data={tableData}
        handleClick={(playerId) => addPlayer(playerId)}
        buttonTitle={'Dodaj gracza'}
        buttonColor={'primary'}
        rowsPerPageOnStart={[1, 6, 12]}
      />
    </>
  )
}

AddPlayersTable.propTypes = {
  addPlayer: PropTypes.func.isRequired
}

export default AddPlayersTable
