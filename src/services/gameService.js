import axios from '../axios'

const allGames = '/games.json'

export const addGame = (data) => {
  const res = axios.post(allGames, {
    ...data
  })
  return res
}

export const updateGame = (data) => {
  console.log(data)
  const res = axios.patch(`games\\${data.id}.json`, {
    ...data
  })
  return res
}

export const fetchAllGames = () => {
  const res = axios.get(`${allGames}?orderBy="active"&equalTo=true`, {})
  return res
}

export const fetchGameByUserAdded = (data) => {
  const res = axios.get(`${allGames}?orderBy="addedBy"&equalTo="${data}"`, {})
  return res
}

export const fetchGameByUserTakesPart = () => {
  const res = fetchAllGames()
  return res
}

export const fetchGameById = (data) => {
  const res = axios.get(`${allGames}?orderBy="$key"&equalTo="${data}"`, {})
  return res
}

export const fetchPlayers = (data) => {
  const res = axios.get(`games\\${data}\\players.json`, {
    ...data
  })
  return res
}

export const fetchPlayersOnReserve = (data) => {
  const res = axios.get(`games\\${data}\\reserve.json`, {
    ...data
  })
  return res
}

export const updatePlayersInGame = (id, data) => {
  const res = axios.patch(`games\\${id}.json`, {
    ...data
  })
  return res
}
