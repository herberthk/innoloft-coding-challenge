import React, { FC } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Company } from "@/interface";
import Loader from "../common/Loader";

interface Prop {
  company?: Company;
}
const MapComponent: FC<Prop> = ({ company }) => {
  const lng = parseFloat(company?.address?.longitude!);
  const lat = parseFloat(company?.address?.latitude!);

  const options = {
    center: {
      lat,
      lng,
    },
    zoom: 7,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(options.center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <div className="map-styles">
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="map-container_styles"
          center={options.center}
          zoom={options.zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={options.center} />
        </GoogleMap>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
