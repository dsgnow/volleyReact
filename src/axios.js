import axios from 'axios'
import { axiosBaseUrl } from './keys'

const instance = axios.create({
  baseURL: axiosBaseUrl
})

export default instance
