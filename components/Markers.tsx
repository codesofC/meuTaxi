import { useAddressDestinationCoordinates } from "@/utils/context/useAddressDestinationCoordinates";
import { useAddressFromCoordinates } from "@/utils/context/useAddressFromCoordinates";
import { useUserLocation } from "@/utils/context/useUserLocation";
import Image from "next/image";
import { Marker } from "react-map-gl";

const Markers = () => {
  const { userLocation } = useUserLocation();
  const { fromAddressCoordinates } = useAddressFromCoordinates()
  const { destinationAddressCoordinates } = useAddressDestinationCoordinates()

  return (
    <div>
      {/* User Location Marker if the app get it */}

      {userLocation && <Marker
        longitude={userLocation.longitude}
        latitude={userLocation.latitude}
        anchor="bottom"
      >
        <Image
          src="/assets/pin.png"
          alt="Pin"
          width={25}
          height={50}
          className="w-10 h-10"
        />
      </Marker>}

      {/* From Adress Marker */}
      
      {fromAddressCoordinates && <Marker
        longitude={fromAddressCoordinates.longitude}
        latitude={fromAddressCoordinates.latitude}
        anchor="bottom"
      >
        <Image
          src="/assets/pin.png"
          alt="Pin"
          width={25}
          height={50}
          className="w-10 h-10"
        />
      </Marker>}

      {/* Destination adress Marker */}
      
      {destinationAddressCoordinates && <Marker
        longitude={destinationAddressCoordinates.longitude}
        latitude={destinationAddressCoordinates.latitude}
        anchor="bottom"
      >
        <Image
          src="/assets/pin.png"
          alt="Pin"
          width={25}
          height={50}
          className="w-10 h-10"
        />
      </Marker>}
    </div>
  );
};

export default Markers;
