import { useEffect, useState } from 'react';
import { useAppSelector } from './reduxHooks';

interface UseMapDisplayProps {
  initialAddress?: string;
}

const useMapDisplay = ({ initialAddress }: UseMapDisplayProps) => {
  const isLoaded = useAppSelector((state) => state.map.isLoaded);

  const [finalLocation, setFinalLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [finalAddress, setFinalAddress] = useState(initialAddress);

  const geocodeAddress = (address: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { location } = results[0].geometry;
        setFinalLocation({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        alert('주소를 다시 입력해 주세요.');
      }
    });
  };

  useEffect(() => {
    if (initialAddress && isLoaded) {
      geocodeAddress(initialAddress);
      setFinalAddress(initialAddress);
    }
  }, [initialAddress, isLoaded]);

  const handleDetailLocationInput = (detail: string) => {
    const fullAddress = `${finalAddress}, ${detail}`;
    geocodeAddress(fullAddress);
    setFinalAddress(fullAddress);
  };

  const handleMarkerDragEnd = (newLocation: google.maps.LatLngLiteral) => {
    setFinalLocation(newLocation);
  };

  return {
    finalLocation,
    finalAddress,
    handleDetailLocationInput,
    handleMarkerDragEnd,
  };
};

export default useMapDisplay;
