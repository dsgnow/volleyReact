import { fetchGameById } from '../services/gameService'
import { objectToArrayWithId } from '../helpers/objects'

const calcSquads = (gameId) => {
  let groups = []
  let gameDetails = []

  const getGameDetails = async () => {
    const resGameDetails = await fetchGameById(gameId)
    gameDetails = objectToArrayWithId(resGameDetails.data)[0]

    let gameEndTimes = [
      gameDetails.rotationTime1,
      gameDetails.rotationTime2,
      gameDetails.rotationTime3
    ]

    let allPlayers = gameDetails.players

    let allPlayers1 = [
      {
        id: '23',
        name: 'Monika Szablińska',
        skill: 1,
        endTime: '2021-05-24T17:00:23.515Z',
        info: '',
        gender: 'male'
      },
      {
        id: '7',
        name: 'Grzegorz Gil',
        skill: 8,
        endTime: '2021-05-24T17:00:23.515Z',
        info: '',
        gender: 'male'
      }
    ]

    gameEndTimes.forEach((gameEndTime, indexOfGameEndTime) => {
      let players = JSON.parse(JSON.stringify(allPlayers))
      let groups = []
      let malePlayersPlayingUntilTheGivenTime = []
      let femalePlayersPlayingUntilTheGivenTime = []
      let bestGroupsNumber

      const filterMalePlayersPlayingUntilTheGivenTime = (gameEndTime) => {
        malePlayersPlayingUntilTheGivenTime = players.filter(
          (player) => player.endTime >= gameEndTime
        )
      }

      const filterFemalePlayersPlayingUntilTheGivenTime = (gameEndTime) => {
        femalePlayersPlayingUntilTheGivenTime = players.filter(
          (player) => player.endTime >= gameEndTime && player.gender == 'female'
        )
      }

      const calcBestNumberOfGroups = (allPlayers) => {
        if (allPlayers > 30) {
          bestGroupsNumber = 6
        } else if (allPlayers <= 30 && allPlayers >= 16) {
          bestGroupsNumber = 4
        } else if (allPlayers < 16 && allPlayers >= 6) {
          bestGroupsNumber = 2
        } else {
          bestGroupsNumber = 1
        }
      }

      const createGroups = () => {
        for (let i = 0; i < bestGroupsNumber; i++) {
          groups[i] = {
            id: i + 1,
            name: `grupa ${i + 1}`,
            skill: 0,
            players: '',
            playersCount: 0
          }
        }
      }

      let indexOfGroupToPush = 0

      const assignPlayersToGroups = (players) => {
        players.forEach(() => {
          let indexOfMaxSkill = players
            .map(function (e) {
              return e.skill
            })
            .indexOf(
              Math.max.apply(
                Math,
                players.map((o) => o.skill)
              )
            )

          console.log(indexOfMaxSkill)

          let indexOfName = allPlayers.findIndex(
            (x) => x.name === players[indexOfMaxSkill].name
          )

          const pushPlayersToGroups = () => {
            allPlayers[indexOfName].info == ''
              ? (allPlayers[indexOfName].info += `Rotacja ${
                  indexOfGameEndTime + 1
                } / Grupa: ${groups[indexOfGroupToPush].id}`)
              : (allPlayers[indexOfName].info += `, <br>Rotacja ${
                  indexOfGameEndTime + 1
                } / Grupa: ${groups[indexOfGroupToPush].id}`)

            // console.log(players[indexOfMaxSkill].name, groups[indexOfGroupToPush].name);

            groups[indexOfGroupToPush].playersCount++

            groups[indexOfGroupToPush].skill += players[indexOfMaxSkill].skill

            groups[indexOfGroupToPush].players == ''
              ? (groups[indexOfGroupToPush].players +=
                  players[indexOfMaxSkill].name)
              : (groups[
                  indexOfGroupToPush
                ].players += `, ${players[indexOfMaxSkill].name}`)

            players[indexOfMaxSkill].skill = ''

            if (indexOfGroupToPush === groups.length - 1) {
              groups.length >= 4 && groups.reverse()
              groups.reverse()
              indexOfGroupToPush = 0
            } else {
              indexOfGroupToPush++
            }
          }
          pushPlayersToGroups()
        })
      }

      // function shuffleArray(players) {
      //   for (var i = players.length - 1; i > 0; i--) {
      //     var j = Math.floor(Math.random() * (i + 1));
      //     var temp = players[i];
      //     players[i] = players[j];
      //     players[j] = temp;
      //   }
      // }
      // shuffleArray(players);
      filterMalePlayersPlayingUntilTheGivenTime(gameEndTime)
      //   filterFemalePlayersPlayingUntilTheGivenTime(gameEndTime)
      calcBestNumberOfGroups(malePlayersPlayingUntilTheGivenTime.length)
      createGroups(bestGroupsNumber)
      assignPlayersToGroups(malePlayersPlayingUntilTheGivenTime)
      assignPlayersToGroups(femalePlayersPlayingUntilTheGivenTime)
      console.log(groups)
    })
  }

  getGameDetails()

  return groups
}

export default calcSquads
