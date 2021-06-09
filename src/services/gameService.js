import axios from '../axios'

const allGames = '/games.json'

export const addGame = (data) => {
  return axios.post(allGames, {
    ...data
  })
}

export const deleteGame = (id) => {
  return axios.delete(`games\\${id}.json`, {})
}

export const updateGame = (data) => {
  return axios.patch(`games\\${data.id}.json`, {
    ...data
  })
}

export const updateGameById = (id, data) => {
  return axios.patch(`games\\${id}.json`, {
    ...data
  })
}

export const fetchAllActiveGames = () => {
  return axios.get(`${allGames}?orderBy="active"&equalTo=true`, {})
}

export const fetchAllGames = () => {
  return axios.get(`${allGames}`, {})
}

export const fetchGameByUserAdded = (data) => {
  return axios.get(`${allGames}?orderBy="addedBy"&equalTo="${data}"`, {})
}

export const fetchGameByUserTakesPart = () => {
  return fetchAllActiveGames()
}

export const fetchGameById = (data) => {
  return axios.get(`${allGames}?orderBy="$key"&equalTo="${data}"`, {})
}

export const fetchPlayers = (data) => {
  return axios.get(`games\\${data}\\players.json`, {
    ...data
  })
}

export const fetchAllPlayers = () => {
  return axios.get(`users.json`, {})
}

export const fetchPlayersOnReserve = (data) => {
  return axios.get(`games\\${data}\\reserve.json`, {
    ...data
  })
}

export const updatePlayersInGame = (id, data) => {
  return axios.patch(`games\\${id}.json`, {
    ...data
  })
}
