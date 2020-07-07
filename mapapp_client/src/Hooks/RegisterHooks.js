import { useState } from "react";

const useRegisterform = (callback) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
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

export default useRegisterform;
