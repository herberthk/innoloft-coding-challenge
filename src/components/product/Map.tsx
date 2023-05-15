import React, { FC, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loader from "../common/Loader";

interface Prop {
  lat: number;
  lng: number;
}
const MapComponent: FC<Prop> = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
  });

  const center = useMemo(
    () => ({
      lat,
      lng,
    }),
    [lat, lng]
  );

  return (
    <div className="map-styles">
      {!isLoaded ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container_styles"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapComponent;
