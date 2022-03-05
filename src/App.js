import React, { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";

function App() {
  const [ip, setIp] = useState("");
  const [coordinates, setCoordinates] = useState([52.5065133, 13.1445545]);
  const [loading, setLoading] = useState(false);
  const [flagCode, setFlagCode] = useState("de");
  const flag = `https://flagcdn.com/16x12/${flagCode}.png`;
  const flagAlt = `https://flagcdn.com/${flagCode}/codes.json`;

  useEffect(() => {
    const fetchIp = async () => {
      const url = ` https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`;
      try {
        setLoading(true);
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIp(data.ip);
          setCoordinates([data.location.lat, data.location.lng]);
          console.log("Koordinaten", coordinates);
          setLoading(false);
        } else {
          console.error("Fetch error!");
          alert("There has been an error!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchIp();
  });

  return (
    <div>
      <h1>MY IP ADDRESS</h1>
      <p>Your IP is: {loading ? <p>loading ..</p> : { ip }}</p>
      <p>Your location is: </p>
      <img src={flag} alt={flagAlt} />
      <Map height={300} defaultCenter={[coordinates]} defaultZoom={11}></Map>
    </div>
  );
}

export default App;
