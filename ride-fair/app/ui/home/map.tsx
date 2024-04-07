"use client";

import { useEffect, useState, useContext } from "react";
import { Context } from "@/app/lib/store";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY as string;

const Map = () => {
  const ctx = useContext(Context);

  const { latitude: initLat, longitude: initLng } = ctx.userLocation;

  const [lng, setLng] = useState(initLng);
  const [lat, setLat] = useState(initLat);
  const [zoom, setZoom] = useState(16);
  const [pickupCoords, setPickupCoords] = useState();
  const [destinationCoords, setDestinationCoords] = useState();

  // const getCoords = useCallback(async (location) => {
  //   try {
  //     const res = await fetch(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` +
  //         new URLSearchParams({
  //           access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY,
  //           limit: 1,
  //         })
  //     );
  //     const data = await res.json();

  //     const coords = data.features[0].center;
  //     return coords;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

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
        padding: 150,
      });
    }
  }, [lng, lat, zoom, pickupCoords, destinationCoords]);

  // useEffect(() => {
  //   if (!locations) {
  //     setPickupCoords();
  //     setDestinationCoords();
  //     return;
  //   }

  //   const setCoords = async () => {
  //     try {
  //       const { pickupLocation, destinationLocation } = locations;

  //       if (pickupLocation.toLowerCase() === "my location") {
  //         setPickupCoords([lng, lat]);
  //         setDestinationCoords(await getCoords(destinationLocation));
  //         return;
  //       }

  //       const promises = [pickupLocation, destinationLocation].map((loc) =>
  //         getCoords(loc)
  //       );

  //       const [pickup, destination] = await Promise.all(promises);
  //       setPickupCoords(pickup);
  //       setDestinationCoords(destination);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   setCoords();
  // }, [locations]);

  return <div id="map" className={"w-full h-[65%]"} />;
};

export default Map;
