import React, { useState } from "react";
import axios from "axios";


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  // const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c270cd9d1e25a74ea11daf706365a694`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=fr&appid=c270cd9d1e25a74ea11daf706365a694`
  // const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c270cd9d1e25a74ea11daf706365a694`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {

      axios.get(url).then((response) => {
        setData(response.data)
        console.log("res DATA   ", response.data);
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Entrez une localisation'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h1>{data.name}</h1>
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}°C</h2> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Ressenti</p>
            </div>
            <div className="humiditée">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humiditée</p>
            </div>
            <div className="vent">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()}m/s</p> : null}
              <p>Vent</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}


export default App;
