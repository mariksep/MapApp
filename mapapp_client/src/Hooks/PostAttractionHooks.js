import { useState } from "react";

const usePostAttraction = (callback) => {
  const [inputs, setInputs] = useState({
    name: "",
    coords: "",
    address: "",
    type: "",
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

export default usePostAttraction;
