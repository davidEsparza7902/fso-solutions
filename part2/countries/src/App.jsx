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
const Country = ({ country }) => {
  const languages = Object.values(country.languages)
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags['png']} alt="" />
    </>
  )
}
const Content = ({ countries }) => {
  const [show, setShow] = useState({})
  const toggleShow = (countryName) => {
    setShow({ ...show, [countryName]: !show[countryName] })
  }
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  else if (countries.length > 1) {
    return countries.map((country) => (
      <div key={country.name.common}>
        <p>{country.name.common}</p>
        <button onClick={() => toggleShow(country.name.common)}>
          {show[country.name.common] ? 'Hide' : 'Show'}
        </button>
        {show[country.name.common] ? <Country country={country} /> : null}
      </div>
    ))
  }
  if (countries.length === 1) return <Country country={countries[0]} />

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
