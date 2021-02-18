import http from './httpService'
import { apiUrl } from '../config.json'
import jwtDecode from 'jwt-decode'

const tokenKey = 'token'

const login = async (user) => {
  const { data: jwt } = await http.post(`${apiUrl}/auth`, {
    email: user.username,
    password: user.password,
  })
  localStorage.setItem(tokenKey, jwt)
}

const loginWithJWT = (jwt) => {
  localStorage.setItem(tokenKey, jwt)
}

const getJWT = () => {
  //console.log(localStorage.getItem(tokenKey))
  return localStorage.getItem(tokenKey)
}

const logout = () => {
  localStorage.removeItem(tokenKey)
}

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwtDecode(jwt)
  } catch (error) {
    console.log('Failed to decode JWT token')
    return null
  }
}

//window.location = '/' reloads all the resources including this authService.js file
http.setJwt(getJWT())

export default {
  login,
  getJWT,
  logout,
  getCurrentUser,
  loginWithJWT,
}
