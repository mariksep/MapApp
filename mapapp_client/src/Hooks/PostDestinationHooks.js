import { useState } from "react";

const usePostDestination = (callback) => {
  const [inputs, setInputs] = useState({
    destinationName: "",
    coords: "",
  });
  const handlesubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleCoordsChange = (event) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        coords: { lat: event.latlng.lat, lng: event.latlng.lng },
      };
    });
  };

  return {
    inputs,
    setInputs,
    handlesubmit,
    handleInputChange,
    handleCoordsChange,
  };
};

export default usePostDestination;
