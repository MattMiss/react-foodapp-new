import { useState } from "react";

const UseInputForm = (callback) => {

    const [fields, setFields] = useState({});

    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    }

    const handleInputChange = (event) => {
      event.persist();
      setFields(fields => ({...fields, [event.target.id]: event.target.value}));
    }

    return {
      handleSubmit,
      handleInputChange,
      fields
    };
  
}

export default UseInputForm;