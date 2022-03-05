import React, { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";

const MapComp = (coordinates) => {
  console.log(coordinates);

  return <Map height={300} center={coordinates} zoom={11} />;
};

export default MapComp;
