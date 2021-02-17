import http from './httpService'
import { apiUrl } from '../config.json'

const getGenres = async () => {
  return await http.get(apiUrl + `/genres`)
}

export { getGenres }
