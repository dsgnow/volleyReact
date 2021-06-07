import { init } from 'emailjs-com'
import emailjs from 'emailjs-com'
init('user_AoI2i08DYgNhf8tElHnoP')

export const sendEmail = (userDetails, gameDetails, template) => {
  const templateParams = {
    to_name: userDetails.firstName,
    email: userDetails.email,
    game_city: gameDetails.city,
    game_street: gameDetails.street,
    dateStart: gameDetails.dateStart
  }

  userDetails.emailNotifications &&
    emailjs.send('service_96bedfd', template, templateParams).then(
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
      emailjs.send('service_96bedfd', template, templateParams).then(
        function (response) {
          return response.status
        },
        function (error) {
          return error
        }
      )
  })
}
