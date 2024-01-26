const loadGoogleMapsAPI = (): void => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

export default loadGoogleMapsAPI;