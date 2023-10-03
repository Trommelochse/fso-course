import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY

const weatherService = (lat, lon) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.data)  
}

export default weatherService


