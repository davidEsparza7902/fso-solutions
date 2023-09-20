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
export default {
  getAll,
}
