import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://volley-6247b-default-rtdb.firebaseio.com'
})

export default instance
