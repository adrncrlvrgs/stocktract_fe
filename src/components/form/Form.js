import React from "react";
import serialize from "form-serialize";


const usePostForm = (onSubmit) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false) {
      form.classList.add("was-validated");
      return false;
    }

    const serializedData = serialize(form, { hash: true });
    onSubmit(serializedData);
  };

  return handleSubmit;
};

const CustomForm = ({ onSubmit, children, ...props }) => {
  const handleSubmit = usePostForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};

export default CustomForm;
