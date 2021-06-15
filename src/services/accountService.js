import axiosAuth from '../axios-auth'
import axios from '../axios'

export const signUp = (data) => {
  return axiosAuth.post('accounts:signUp', {
    ...data,
    returnSecureToken: true
  })
}

export const updateAccount = (data) => {
  return axiosAuth.post('accounts:update', {
    ...data,
    returnSecureToken: true
  })
}

export const resetPassword = (data) => {
  return axiosAuth.post('accounts:sendOobCode', {
    ...data
  })
}

export const updateUser = (data) => {
  return axios.patch(data.path, {
    ...data
  })
}

export const addNewUser = (data) => {
  return axios.put(data.path, {
    ...data
  })
}

export const fetchUserById = (data) => {
  return axios.get(`/users.json?orderBy="$key"&equalTo="${data}"`, {})
}
