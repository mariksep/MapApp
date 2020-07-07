import { useState } from "react";

const useLoginform = (callback) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputsChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  return { handleSubmit, handleInputsChange, inputs };
};

export default useLoginform;
