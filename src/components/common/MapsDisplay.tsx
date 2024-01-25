import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

interface MapDisplayProps {
  location: google.maps.LatLngLiteral | null;
  onMarkerDragEnd?: (location: google.maps.LatLngLiteral) => void;
  mapContainerStyle?: React.CSSProperties;
  draggable: boolean;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  location,
  onMarkerDragEnd,
  mapContainerStyle,
  draggable,
}) => {
  const [markerLoaded, setMarkerLoaded] = useState(false);

  useEffect(() => {
    if (location && !markerLoaded) {
      setMarkerLoaded(true);
    }
  }, [location, markerLoaded]);

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation: google.maps.LatLngLiteral = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      onMarkerDragEnd?.(newLocation);
    }
  };

  const isLoaded = useAppSelector((state) => state.map.isLoaded);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={location || { lat: -34.397, lng: 150.644 }} // 기본 위치를 설정할 수 있습니다.
      zoom={15}
      mapContainerStyle={
        mapContainerStyle || { width: '400px', height: '400px' }
      }
    >
      {location && (
        <Marker
          position={location}
          draggable={draggable}
          onDragEnd={handleMarkerDragEnd}
          onLoad={() => setMarkerLoaded(true)}
        />
      )}
    </GoogleMap>
  );
};

export default MapDisplay;
