import React from 'react'
import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
  
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
        setPickup(suggestion.description)
    } else if (activeField === 'destination') {
        setDestination(suggestion.description)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
}

  return (
    <div>
      {
        suggestions.map((elem, idx) => (
          <div key={idx} onClick={()=> handleSuggestionClick(elem)} className='flex items-center border-gray-50 active:border-black border-2  mt-2 p-3 rounded-xl gap-4 my-2 justify-start'
          >
            <h2 className='bg-gray-300 w-10 flex items-center justify-center p-2   rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{elem?.description}</h4>
          </div>
        ))
      }
    </div>
  );
};

export default LocationSearchPanel;
