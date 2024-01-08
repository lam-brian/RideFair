import { useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

const Map = ({ locations }) => {
  const [lng, setLng] = useState(-99.29);
  const [lat, setLat] = useState(39.39);
  const [zoom, setZoom] = useState(3);
  const [pickupCoords, setPickupCoords] = useState();
  const [destinationCoords, setDestinationCoords] = useState();

  const getCoords = useCallback(async (location) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` +
          new URLSearchParams({
            access_token: import.meta.env.VITE_MAPBOX_KEY,
            limit: 1,
          })
      );
      const data = await res.json();

      const coords = data.features[0].center;
      return coords;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const initMapSettings = useCallback((position) => {
    setLng(position.coords.longitude);
    setLat(position.coords.latitude);
    setZoom(16);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initMapSettings, () => {
        console.log("Unable to retrieve your location");
      });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });

    if (pickupCoords && destinationCoords) {
      new mapboxgl.Marker().setLngLat(pickupCoords).addTo(map);
      new mapboxgl.Marker().setLngLat(destinationCoords).addTo(map);

      map.fitBounds([pickupCoords, destinationCoords], {
        padding: 200,
      });
    }
  }, [lng, lat, zoom, pickupCoords, destinationCoords]);

  useEffect(() => {
    if (!locations) {
      setPickupCoords();
      setDestinationCoords();
      return;
    }

    const setCoords = async () => {
      try {
        const { pickupLocation, destinationLocation } = locations;

        if (pickupLocation.toLowerCase() === "my location") {
          setPickupCoords([lng, lat]);
          setDestinationCoords(await getCoords(destinationLocation));
          return;
        }

        const promises = [pickupLocation, destinationLocation].map((loc) =>
          getCoords(loc)
        );

        const [pickup, destination] = await Promise.all(promises);
        setPickupCoords(pickup);
        setDestinationCoords(destination);
      } catch (err) {
        console.log(err);
      }
    };
    setCoords();
  }, [locations]);

  return <div id="map" className="w-full h-5/6" />;
};

export default Map;
