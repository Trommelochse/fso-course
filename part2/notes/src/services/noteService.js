import axios from 'axios'
const baseURL = 'http://localhost:3001/notes'


const getAll = () => {
  const req = axios.get(baseURL)
  return req.then(res => res.data)
}

const create = (newObj) => {
  const req = axios.post(baseURL, newObj)
  return req.then(res => res.data)
}

const update = (id, newObj) => {
  const req = axios.put(`${baseURL}/${id}`, newObj)
  return req.then(res => res.data)
}

export default {
  getAll,
  create,
  update
}