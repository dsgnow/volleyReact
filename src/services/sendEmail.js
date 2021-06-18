import { init } from 'emailjs-com'
import emailjs from 'emailjs-com'
import { emailInit, emailServiceId } from '../keys'

init(emailInit)

export const sendEmail = (userDetails, gameDetails, template) => {
  const templateParams = {
    to_name: userDetails.firstName,
    email: userDetails.email,
    game_city: gameDetails.city,
    game_street: gameDetails.street,
    dateStart: gameDetails.dateStart
  }

  userDetails.emailNotifications &&
    emailjs.send(emailServiceId, template, templateParams).then(
      function (response) {
        return response.status
      },
      function (error) {
        return error
      }
    )
}

export const sendEmailAddGame = (users, gameDetails, template) => {
  users.map((user) => {
    const templateParams = {
      to_name: user.firstName,
      email: user.email,
      game_city: gameDetails.city,
      game_street: gameDetails.street,
      dateStart: gameDetails.dateStart
    }

    user.emailNotifications &&
      emailjs.send(emailServiceId, template, templateParams).then(
        function (response) {
          return response.status
        },
        function (error) {
          return error
        }
      )
  })
}
