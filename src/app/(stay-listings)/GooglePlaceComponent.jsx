'use client'
import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const GooglePlaceComponent = ({setLocation}) => {
  const [address, setAddress] = useState('');

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then((results) => {
        setLocation(results[0].formatted_address)
        getLatLng(results[0])
      })
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className:
                'location-search-input flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:border-primary-500 focus:outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    // className,
                    // style,
                  })}
                  className="absolute top-[2.5rem] rounded-md p-3 z-[9] bg-gray-50 border border-gray-200"
                  key={suggestion.placeId} // To avoid key warning
                >
                  <span className="cursor-pointer border-b">
                    {suggestion.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GooglePlaceComponent;
