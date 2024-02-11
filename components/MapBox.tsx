"use client";

import Image from "next/image";
import Map, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { UserLocationProps } from "@/utils/types";


const MapBox = ({
  userLocation,
}: {
  userLocation: UserLocationProps | null;
}) => {
  
  
  return (
    <div className="flex flex-col justify-between gap-6 pt-6 w-full h-full">
      <h1 className="text-xl md:text-2xl font-semibold"> Mapa </h1>
      <div className="rounded-lg overflow-hidden w-full h-full">
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
          >
            <Marker 
              longitude={userLocation.longitude} 
              latitude={userLocation.latitude} 
              anchor="center"
            >
              <Image 
                src="/assets/pin.png" 
                alt="Pin"
                width={25}
                height={50}
                className="w-10 h-10"
              />
            </Marker>
          </Map>
        ) : (
          <div>No location detected</div>
        )}
      </div>
    </div>
  );
};

export default MapBox;
