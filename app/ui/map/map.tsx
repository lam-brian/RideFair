"use client";

import { useEffect, useContext, useCallback } from "react";
import { Context } from "@/app/lib/store";
import { RideLocations } from "@/app/lib/definitions";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY as string;

type MapProps = {
  rideLocations: RideLocations | undefined;
};

const Map = ({ rideLocations }: MapProps) => {
  const ctx = useContext(Context);

  const { latitude: lat, longitude: lng } = ctx.userLocation;

  const getCoords = useCallback(
    async (location: string) => {
      if (location.toLowerCase() === "my location") {
        return [lng, lat];
      }

      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` +
            new URLSearchParams({
              access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY as string,
              limit: "1",
            })
        );
        const data = await res.json();

        const coords = data.features[0].center;
        return coords;
      } catch (err) {
        console.log(err);
      }
    },
    [lng, lat]
  );

  const setMapMarkers = useCallback(
    async (map: mapboxgl.Map) => {
      if (!rideLocations) return;

      try {
        const { pickup, dropOff } = rideLocations;
        const [pickupCoords, dropOffCoords] = await Promise.all(
          [pickup, dropOff].map((location) => getCoords(location))
        );

        new mapboxgl.Marker().setLngLat(pickupCoords).addTo(map);
        new mapboxgl.Marker().setLngLat(dropOffCoords).addTo(map);

        map.fitBounds([pickupCoords, dropOffCoords], {
          padding: 150,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [rideLocations, getCoords]
  );

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 16, // starting zoom
    });

    setMapMarkers(map);
  }, [lng, lat, setMapMarkers]);

  return <div id="map" className={"w-full h-[65%]"} />;
};

export default Map;
