import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_axiosAuthBaseUrl,
  params: {
    key: process.env.REACT_APP_axiosAuthKey
  }
})

export default instance
