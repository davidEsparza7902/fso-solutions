import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'
const getAll = async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (e) {
    throw e
  }
}
const addPerson = (person) => {
  axios.post(baseURL, person)
}
const editPerson = (id, person) => {
  axios.put(`${baseURL}/${id}`, person)
}
const deletePerson = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/${id}`)
  } catch (error) {
    throw error
  }
}
export default {
  addPerson,
  deletePerson,
  editPerson,
  getAll,
}
