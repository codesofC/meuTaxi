"use client";

import { Booking } from "@/components";
import MapBox from "@/components/MapBox";
import { useState, useEffect } from "react";
import { UserLocationProps } from "@/utils/types";
import { userLocationContext } from "@/utils/context/useUserLocation";
import { useAddressFromCoordinatesContext } from "@/utils/context/useAddressFromCoordinates";
import { useAddressDestinationCoordinatesContext } from "@/utils/context/useAddressDestinationCoordinates";
import { directionDataContext } from "@/utils/context/useDirectionData";

export default function Home() {
  const [userLocation, setUserLocation] = useState<UserLocationProps | null>(
    null
  );

  const [fromAddressCoordinates, setFromAddressCoordinates] =
    useState<UserLocationProps | null>(null);

  const [destinationAddressCoordinates, setDestinationAddressCoordinates] =
    useState<UserLocationProps | null>(null);

  const [directionData, setDirectionData] = useState<any>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  };

  return (
    <main className="">
      <userLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <useAddressFromCoordinatesContext.Provider
          value={{ fromAddressCoordinates, setFromAddressCoordinates }}
        >
          <useAddressDestinationCoordinatesContext.Provider
            value={{
              destinationAddressCoordinates,
              setDestinationAddressCoordinates,
            }}
          >
            <directionDataContext.Provider
              value={{directionData, setDirectionData}}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-5 lg:px-10 gap-6">
                <div className="">
                  <Booking />
                </div>
                <div className="col-span-2 order-first md:order-last max-h-[60vh] md:max-h-[90vh]">
                  <MapBox />
                </div>
              </div>
            </directionDataContext.Provider>
          </useAddressDestinationCoordinatesContext.Provider>
        </useAddressFromCoordinatesContext.Provider>
      </userLocationContext.Provider>
    </main>
  );
}
