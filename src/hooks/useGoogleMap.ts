// useGoogleMapsApiLoader.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import { SET_MAP_LOADED } from '../redux/slices/mapSlice';

const useGoogleMapsApiLoader = () => {
  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY as string,
    libraries: ['maps', 'places'],
    language: 'ko',
  });
  useEffect(() => {
    dispatch(SET_MAP_LOADED(isLoaded));
  }, [isLoaded, dispatch]);

  return isLoaded;
};

export default useGoogleMapsApiLoader;
