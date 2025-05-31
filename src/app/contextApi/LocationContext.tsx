'use client'
import React, { createContext, useEffect, useState, ReactNode } from 'react';

// Define the Location type
interface Location {
  latitude: number | null;
  longitude: number | null;
}

// Define the context value type
interface LocationContextType {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

// Create the context with a default value of undefined (we will assert this in provider)
export const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Type for the props of the provider
interface LocationContextProviderProps {
  children: ReactNode;
}

const LocationContextProvider: React.FC<LocationContextProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });

  const findLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  useEffect(() => {
    findLocation();
  }, []);

  const value: LocationContextType = { location, setLocation };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
