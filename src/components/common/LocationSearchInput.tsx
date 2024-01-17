/// <reference types="@types/googlemaps" />

import React, { useState } from 'react';
// Google Places API 로더 및 타입 임포트
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface LocationSearchInputProps {
  onLocationSelect: (address: string) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  onLocationSelect,
}) => {
  const [selected, setSelected] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY as string,
    libraries: ['places'],
  });

  const autocompleteOptions = {
    componentRestrictions: { country: 'KR' },
  };

  const handlePlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    const formattedAddress = place.formatted_address as string;
    console.log(place);
    if (place.geometry && place.address_components) {
      const detailedAddress = place.address_components
        .map((ac) => ac.long_name)
        .join(', ');
      onLocationSelect(formattedAddress);
      setSelected(true);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) =>
        autocomplete.addListener('place_changed', () =>
          handlePlaceSelect(autocomplete),
        )
      }
      options={autocompleteOptions}
    >
      <input
        name="location"
        type="location"
        placeholder="위치를 입력하세요"
        className={`mt-4 h-12 w-full rounded-xl bg-input_bg px-4 py-4 text-xl ${selected ? 'text-slate-500' : 'text-slate-800'} outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 md:w-2/3`}
        onKeyDown={handleKeyPress}
        disabled={selected}
      />
    </Autocomplete>
  );
};

export default LocationSearchInput;
