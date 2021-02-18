import http from './httpService'
import { apiUrl } from '../config.json'

const register = (user) => {
  return http.post(`${apiUrl}/users`, {
    email: user.username,
    password: user.password,
    name: user.name,
  })
}

export default {
  register,
}
