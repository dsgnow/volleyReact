import { init } from 'emailjs-com'
import emailjs from 'emailjs-com'

const sendEmail = (userDetails, gameDetails, template) => {
  init('user_AoI2i08DYgNhf8tElHnoP')

  var templateParams = {
    to_name: userDetails.firstName,
    email: userDetails.email,
    game_city: gameDetails.city,
    game_street: gameDetails.street,
    dateStart: gameDetails.dateStart
  }

  emailjs.send('service_96bedfd', template, templateParams).then(
    function (response) {
      return response.status
    },
    function (error) {
      return error
    }
  )
}

export default sendEmail
