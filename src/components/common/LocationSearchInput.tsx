/// <reference types="@types/googlemaps" />

import React, { useState } from 'react';
// Google Places API 로더 및 타입 임포트
import { Autocomplete } from '@react-google-maps/api';
import { useAppSelector } from '../../hooks/reduxHooks';

interface LocationSearchInputProps {
  onLocationSelect: (address: string) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  onLocationSelect,
}) => {
  const [selected, setSelected] = useState(false);

  const autocompleteOptions = {
    componentRestrictions: { country: 'KR' },
  };

  const handlePlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    const formattedAddress = place.formatted_address as string;
    if (place.geometry && place.address_components) {
      onLocationSelect(formattedAddress);
      setSelected(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const isLoaded = useAppSelector((state) => state.map.isLoaded);

  if (!isLoaded) return <div>Loading...</div>;

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
