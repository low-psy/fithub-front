import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface MapDisplayProps {
  location: Location;
  onMarkerDragEnd?: (location: Location) => void;
  mapContainerStyle?: React.CSSProperties;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  location,
  onMarkerDragEnd,
  mapContainerStyle,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API as string,
  });

  const [markerLoaded, setMarkerLoaded] = useState(false);

  useEffect(() => {
    if (!markerLoaded) {
      setMarkerLoaded(false);
    }
  }, [markerLoaded]);

  const handleMarkerLoad = () => {
    setMarkerLoaded(true);
    console.log('loaded!!!!');
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      onMarkerDragEnd?.(newLocation);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      center={location}
      zoom={15}
      mapContainerStyle={
        mapContainerStyle || { width: '400px', height: '400px' }
      }
      key={1}
    >
      <Marker
        position={location}
        draggable
        onDragEnd={handleMarkerDragEnd}
        onLoad={handleMarkerLoad}
        key={1}
      />
    </GoogleMap>
  );
};

export default MapDisplay;
