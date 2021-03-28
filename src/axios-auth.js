import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  params: {
    key: 'AIzaSyCZ2hEIK-v3vgzUUiPuofHORfbDkxLkmd8'
  }
})

export default instance
