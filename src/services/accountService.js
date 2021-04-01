import axiosAuth from '../axios-auth'
import axios from '../axios'

export const signUp = (data) => {
  const res = axiosAuth.post('accounts:signUp', {
    ...data,
    returnSecureToken: true
  })
  return res
}

export const updateAccount = (data) => {
  const res = axiosAuth.post('accounts:update', {
    ...data,
    returnSecureToken: true
  })
  return res
}

export const updateUser = (data) => {
  const res = axios.patch(data.path, {
    ...data
  })
  return res
}

export const addNewUser = (data) => {
  const res = axios.post(data.path, {
    ...data
  })
  return res
}
