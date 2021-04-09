import axios from '../axios'

const allGames = '/games.json'

export const addGame = (data) => {
  const res = axios.post(allGames, {
    ...data
  })
  return res
}

export const updateGame = (data) => {
  const res = axios.patch(`games\\${data.id}.json`, {
    ...data
  })
  return res
}

export const fetchAllGames = () => {
  const res = axios.get(allGames, {})
  return res
}

export const fetchGameByUserAdded = (data) => {
  const res = axios.get(`${allGames}?orderBy="addedBy"&equalTo="${data}"`, {})
  return res
}

export const fetchGameByUserTakesPart = (data) => {
  const res = axios.get(`${allGames}?orderBy="players/id"&equalTo=9999`, {})
  return res
}

export const fetchGameById = (data) => {
  const res = axios.get(`${allGames}?orderBy="$key"&equalTo="${data}"`, {})
  return res
}
