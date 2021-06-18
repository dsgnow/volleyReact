import axios from 'axios'
import { axiosAuthBaseUrl, axiosAuthKey } from './keys'

const instance = axios.create({
  baseURL: axiosAuthBaseUrl,
  params: {
    key: axiosAuthKey
  }
})

export default instance
