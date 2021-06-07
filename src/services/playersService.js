import { objectToArrayWithId } from '../helpers/objects'
import {
  updatePlayersInGame,
  fetchPlayers,
  fetchGameById,
  fetchPlayersOnReserve
} from './gameService'
import { fetchUserById } from './accountService'
import { sendEmail } from './sendEmail'

export const addPlayerToGame = async (gameId, userId, selectedTimeValue) => {
  selectedTimeValue ? selectedTimeValue : (selectedTimeValue = false)

  try {
    const resGameDetails = await fetchGameById(gameId)
    const gameDetails = objectToArrayWithId(resGameDetails.data)[0]
    const gamePlaces = gameDetails.places

    const resPlayers = await fetchPlayers(gameId)
    let players = resPlayers.data
    const oldPlayers = JSON.parse(JSON.stringify(resPlayers.data))

    const resPlayersOnReserve = await fetchPlayersOnReserve(gameId)
    let playersOnReserve = resPlayersOnReserve.data
    const oldPlayersReserve = JSON.parse(
      JSON.stringify(resPlayersOnReserve.data)
    )

    const resUserDetails = await fetchUserById(userId)
    const userDetails = objectToArrayWithId(resUserDetails.data)[0]
    const userName = userDetails.firstName
    const userLastName = userDetails.lastName

    const newPlayer = {
      id: userId,
      name: `${userName} ${userLastName}`,
      endTime: selectedTimeValue,
      skill:
        userDetails.adminLevel !== ''
          ? Number(userDetails.adminLevel)
          : Number(userDetails.userLevel),
      info: ''
    }

    players ? players.push(newPlayer) : (players = [newPlayer])
    playersOnReserve
      ? playersOnReserve.push(newPlayer)
      : (playersOnReserve = [newPlayer])
    let checkPlayerAlreadyPlaying = oldPlayers
      ? oldPlayers.filter((el) => el.id === userId).length > 0
      : false

    let checkPlayerAlreadyPlayingOnReserve = oldPlayersReserve
      ? oldPlayersReserve.filter((el) => el.id === userId).length > 0
      : false

    if (
      players &&
      !checkPlayerAlreadyPlaying &&
      !checkPlayerAlreadyPlayingOnReserve &&
      gamePlaces >= players.length
    ) {
      await updatePlayersInGame(gameId, {
        players: players
      })
      //   getSelectedGameData(actualGameId)
      return 'Pomyślnie dodano do gry!'
    } else if (
      !checkPlayerAlreadyPlaying &&
      !checkPlayerAlreadyPlayingOnReserve &&
      gamePlaces < players.length
    ) {
      await updatePlayersInGame(gameId, {
        reserve: playersOnReserve
      })
      return 'Brak wolnych miejsc. Pomyślnie dodano na rezerwę.'
    } else if (checkPlayerAlreadyPlaying) {
      return 'Ten gracz już jest dodany do tej gry.'
    } else if (checkPlayerAlreadyPlayingOnReserve) {
      return 'Ten gracz już jest dodany na rezerwie.'
    }
  } catch (ex) {
    return 'Błąd'
  }
}

export const removePlayerFromGame = async (gameId, actualUserId) => {
  try {
    const resPlayers = await fetchPlayers(gameId)
    let players = resPlayers.data

    const resPlayersOnReserve = await fetchPlayersOnReserve(gameId)
    let playersOnReserve = resPlayersOnReserve.data

    const resGameDetails = await fetchGameById(gameId)
    const gameDetails = objectToArrayWithId(resGameDetails.data)[0]
    const gamePlaces = gameDetails.places

    if (playersOnReserve && players && gamePlaces >= players.length) {
      const resUserDetails = await fetchUserById(playersOnReserve[0].id)
      const userDetails = objectToArrayWithId(resUserDetails.data)[0]
      playersOnReserve[0].id !== actualUserId &&
        sendEmail(userDetails, gameDetails, 'template_viw6vfi')

      players.push(playersOnReserve[0])
      playersOnReserve = playersOnReserve.filter(
        (el) => el.id !== playersOnReserve[0].id
      )
      players = players.filter((el) => el.id !== actualUserId)
    } else {
      players
        ? (players = players.filter((el) => el.id !== actualUserId))
        : (players = [{}])

      playersOnReserve
        ? (playersOnReserve = playersOnReserve.filter(
            (el) => el.id !== actualUserId
          ))
        : (playersOnReserve = [{}])
    }

    await updatePlayersInGame(gameId, {
      players: players,
      reserve: playersOnReserve
    })
    return 'Pomyślnie zrezygnowałeś z gry!'
  } catch (ex) {
    return 'Nie udało się zrezygnować z gry.'
  }
}
