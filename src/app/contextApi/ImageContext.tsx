'use client'
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Define the structure of the context
interface ImageContextType {
  imagess: any[];
  setImagess: any;
  token: any;
  setToken: any;
  loggedUser: any;
  setLoggedUser: any;
  allProperties: any;
  setAllProperties: any;
  state: any,
  setState: any,
  stayType: any,
  setStayType: any,
  isOpen: any,
  setIsOpen: any,
}

// Create the context
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Create a provider component
export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // The PHOTOS data
  const [imagess, setImagess] = useState<string[]>([
    'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
    'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ]);

  const [token, setToken] = useState<String | null>(null)
  const [loggedUser, setLoggedUser] = useState<any>()
  const [allProperties, setAllProperties] = useState<any>([])
  const [state, setState] = useState<any>('')
  const [stayType, setStayType] = useState<any>('')
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!token && localStorage.getItem('loginToken')) {
        setToken(localStorage.getItem('loginToken'))
    }
  }, []);

  return (
    <ImageContext.Provider value={{ imagess, setImagess, token, setToken, loggedUser, setLoggedUser, allProperties, setAllProperties, state, setState, stayType, setStayType, isOpen, setIsOpen}}>
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the ImageContext
export const useImages = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};
