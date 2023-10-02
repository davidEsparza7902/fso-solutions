import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'
const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}
const addPerson = (person) => {
  axios.post(baseURL, person)
}
const editPerson = (id, person) => {
  axios.put(`${baseURL}/${id}`, person)
}
const deletePerson = async (id) => {
  const res = await axios.delete(`${baseURL}/${id}`)
  return res.data
}
export default {
  addPerson,
  deletePerson,
  editPerson,
  getAll,
}
