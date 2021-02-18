import axios from 'axios'

//Intercepts 500 level http error code, handling unexpected error
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  if (!expectedError) {
    console.log('An unexpected error occurrred.')
  }

  return Promise.reject(error)
})

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
}
