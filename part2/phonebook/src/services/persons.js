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
const deletePerson = async (person) => {
  try {
    const res = await axios.delete(`${baseURL}/${person.id}`)
  } catch (error) {
    throw error
  }
}
export default {
  getAll,
  addPerson,
  deletePerson,
}
