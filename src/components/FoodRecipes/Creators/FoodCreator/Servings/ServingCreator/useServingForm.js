import { useState } from "react";

const UseServingForm = (callback) => {

    const [fields, setFields] = useState({});

    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    }

    const handleInputChange = (event) => {
        console.log(event)
      event.persist();
      setFields(fields => ({...fields, [event.target.id]: event.target.value}));
    }

    return {
      handleSubmit,
      handleInputChange,
      fields
    };
  
}

export default UseServingForm;