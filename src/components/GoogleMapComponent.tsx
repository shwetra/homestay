'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, GoogleMapProps, Marker } from '@react-google-maps/api';

interface GoogleMapComponentProps {
  latitude: any;
  longitude: any;
}

const containerStyle = {
  height: '400px',
  width: '100%',
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ latitude, longitude }) => {

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!googleMapsApiKey) {
    throw new Error('Google Maps API key is missing in the environment variables');
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey : googleMapsApiKey,
  });

  const center = useMemo(() => ({
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  }), [latitude, longitude]);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
    map.setZoom(16);
  }, [center]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        minZoom: 6,
    maxZoom: 12,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    draggable: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
      }}
    >
      {/* You can add Marker or other components inside the map */}
      <Marker position={{ lat: center.lat, lng: center.lng }} />
      <></>
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
