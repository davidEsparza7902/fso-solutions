import { useState, useEffect } from 'react'
import countriesService from './services/countries'
const SearchBar = ({ value, onChange }) => {
  return (
    <nav>
      <label>Find Countries</label>
      <input type="text" onChange={onChange} value={value} />
    </nav>
  )
}
const Content = ({ countries }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  else if (countries.length > 1)
    return countries.map((country) => {
      return <p key={country.name.common}>{country.name.common}</p>
    })
  if (countries.length === 1) {
    const c = countries[0]
    const languages = Object.values(c.languages)

    return (
      <>
        <h2>{c.name.common}</h2>
        <p>Capital {c.capital}</p>
        <p>Area {c.area}</p>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={c.flags['png']} alt="" />
      </>
    )
  }

  return null
}
const App = () => {
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountries = await countriesService.getCountries()
        setCountries(fetchedCountries)
        console.log('Cargado correctamente')
      } catch (error) {
        console.log('Error :/')
      }
    }
    fetchData()
  }, [])
  const handleChange = async (e) => {
    setSearchWord(e.target.value)
  }
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchWord.toLowerCase())
  )
  return (
    <>
      <SearchBar value={searchWord} onChange={handleChange} />
      <Content countries={countriesToShow} />
    </>
  )
}

export default App
