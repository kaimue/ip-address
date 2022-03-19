import React, { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";

function App() {
  const [ip, setIp] = useState("");
  const [coordinates, setCoordinates] = useState([52.5065133, 13.1445545]);
  const [ipLoading, setIpLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState(""); // should be initially empty
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchIp = async () => {
      const url = ` https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`;
      try {
        setIpLoading(true);
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIp(data.ip);
          setCoordinates([data.location.lat, data.location.lng]);
          console.log(coordinates);
          console.log([data.location.lat, data.location.lng]);
          setCountryCode(data.location.country.toLowerCase());
          console.log(data.location.country.toLowerCase());
          setIpLoading(false);
        } else {
          console.error("Fetch error!");
          alert("You are a great programmer!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchIp();
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
      try {
        setLoading(true);
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(`Data from fetchCountryData`, data[0]);
          setCountryData(data[0]);
          console.log(`CountryCode inside of fetchCountryData ${countryCode}`);

          setLoading(false);
        } else {
          console.error("Fetch error!");
          alert("You are a great programmer!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchCountryData();
  }, [countryCode]);

  return (
    <div class="container">
      <br></br>
      <h1>MY IP ADDRESS</h1>
      <ul class="list-group">
        <>
          {ipLoading ? (
            <p>loading ..</p>
          ) : (
            <li class="list-group-item">Your IP is: {ip}</li>
          )}
        </>
        <>
          {loading ? (
            <p>loading ..</p>
          ) : (
            <ul class="list-group">
              <li class="list-group-item">Flag: {countryData.flag}</li>
              <li class="list-group-item">
                Country: {countryData.name.common}
              </li>
              <li class="list-group-item">Capital: {countryData.capital}</li>
              <li class="list-group-item">
                Currency: {countryData.currencies.EUR.name}{" "}
                {countryData.currencies.EUR.symbol}
              </li>
            </ul>
          )}
        </>
      </ul>
      <Map height={300} center={coordinates} defaultZoom={11}>
        <Marker width={50} anchor={coordinates} />
      </Map>
    </div>
  );
}

export default App;
