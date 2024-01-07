import { useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidHJlYzAwbDEyMyIsImEiOiJjbHIzNGlzMWIxOXRyMmltYzJpODJjbGU1In0.xI-jGoQrieT2FgHFLVgMKw";

const Map = () => {
  const [lng, setLng] = useState(-99.29);
  const [lat, setLat] = useState(39.39);
  const [zoom, setZoom] = useState(3);

  const getGeoLocation = useCallback((position) => {
    setLng(position.coords.longitude);
    setLat(position.coords.latitude);
    setZoom(16);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getGeoLocation, () => {
        console.log("Unable to retrieve your location");
      });
    } else {
      console.log("Geolocation not supported");
    }

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });
  }, [lng, lat, zoom]);

  return <div id="map" className="w-screen h-screen" />;
};

export default Map;
