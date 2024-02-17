"use client";

import { useEffect, useRef } from "react";
import Map from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useUserLocation } from "@/utils/context/useUserLocation";
import Markers from "./Markers";
import { useAddressDestinationCoordinates } from "@/utils/context/useAddressDestinationCoordinates";
import { useAddressFromCoordinates } from "@/utils/context/useAddressFromCoordinates";
import { useDirectionData } from "@/utils/context/useDirectionData";
import MapBoxRouteDraw from "./MapBoxRouteDraw";
import MapDistance from "./MapDistance";


// Variables to get direction url
const MAPBOX_DRIVING_ENDPOINT = "https://api.mapbox.com/directions/v5/mapbox/driving/"



const MapBox = () => {
  
  const mapRef = useRef<any>()
  const { userLocation } = useUserLocation()
  const { destinationAddressCoordinates } = useAddressDestinationCoordinates()
  const { fromAddressCoordinates } = useAddressFromCoordinates()

  const { directionData, setDirectionData } = useDirectionData()

  // UseEffects used to fly to Source and Destination Location Marker
  useEffect(() => {

    if( fromAddressCoordinates ){
      mapRef.current?.flyTo({
        center: [
          fromAddressCoordinates.longitude,
          fromAddressCoordinates.latitude
        ],
        duration: 2500
      })
    }
  }, [fromAddressCoordinates])

  useEffect(() => {

    if( destinationAddressCoordinates ){
      mapRef.current?.flyTo({
        center: [
          destinationAddressCoordinates.longitude,
          destinationAddressCoordinates.latitude
        ],
        duration: 2500
      })

      getRoute()
    }
  }, [destinationAddressCoordinates])

  // Fetch the direction coordonates to get the route
  const getRoute = async () => {

    const res = await fetch(`${MAPBOX_DRIVING_ENDPOINT}${fromAddressCoordinates?.longitude},${fromAddressCoordinates?.latitude};${destinationAddressCoordinates?.longitude},${destinationAddressCoordinates?.latitude}?annotations=maxspeed&overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`, 
    {
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await res.json()

    setDirectionData(result)
  }
  
  return (
    <div className="flex flex-col justify-between gap-6 pt-6 w-full h-full">
      <h1 className="text-xl md:text-2xl font-semibold"> Mapa </h1>
      <div className="relative rounded-lg overflow-hidden w-full h-full">
        {userLocation ? (
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.longitude,
              latitude: userLocation?.latitude,
              zoom: 14,
            }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            ref={mapRef}
          >
            <Markers />

            {directionData?.routes && <MapBoxRouteDraw coordinates={directionData.routes[0]?.geometry?.coordinates} />}
          </Map>
        ) : null}

        {directionData && directionData.routes ? (
          <MapDistance />
        ) : null}
      </div>
    </div>
  );
};

export default MapBox;
