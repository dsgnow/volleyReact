import axiosAuth from '../axios-auth'
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

export const fetchGameById = (data) => {
  const res = axios.get(`${allGames}?orderBy="$key"&equalTo="${data}"`, {})
  return res
}
