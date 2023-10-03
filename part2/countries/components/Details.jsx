import { useState, useEffect } from "react"
import weatherService from "../services/weatherService"

const Weather = ({climate}) => {
  return (
    <div>
        <p>{climate.description} ({climate.temp} C°)</p>
        <img src={`https://openweathermap.org/img/wn/${climate.icon}@2x.png`} alt={climate.icon} />
        <p>{climate.windSpeed} m/s</p>
    </div>
  )
}

const Details = ({country}) => {
  const [climate, setClimate] = useState(null)

  useEffect(() => {
    weatherService(country.latlng[0], country.latlng[1])
      .then((weather) => {
        setClimate({
          temp: weather.main.temp,
          icon: weather.weather[0].icon,
          description: weather.weather[0].description,
          windSpeed: weather.wind.speed
        })
      })
  },[])

  return (
    <div>
      <h2>{country.name.common} {country.name.common === country.name.official ? null : ` (${country.name.official})`}</h2>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Area:</b> {country.area} km²</p>
      <p>Languages spoken:</p>
      <ul>
        {Object.getOwnPropertyNames(country.languages).map((language) => <li key={language}>{country.languages[language]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      { climate ? <Weather climate={climate}/> : null}
    </div>
  )
}
export default Details