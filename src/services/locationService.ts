const getCurrentPosition = (): Promise<google.maps.LatLngLiteral> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      resolve({ lat: latitude, lng: longitude });
    }, reject);
  });
};

export default getCurrentPosition;
