import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const getCountries = async () => {
  try {
    const res = await axios.get(`${baseURL}/all`)
    const countries = res.data
    return countries
  } catch (e) {
    throw e
  }
}
export default {
  getCountries,
}
