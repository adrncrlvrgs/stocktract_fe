import React, { useState } from "react";
import serialize from "form-serialize";

const usePostForm = (onSubmit, validate) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const serializedData = serialize(form, { hash: true });

    const fileInputs = form.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      if (input.files && input.files[0]) {
        serializedData[input.name] = input.files[0]; 
      }
    });

    if (validate) {
      const validationErrors = await validate(serializedData);
      if (Object.keys(validationErrors).length) {
        setErrors(validationErrors);
        return;
      }
    }
    setErrors({});
    onSubmit(serializedData);
  };

  return { handleSubmit, errors };
};

const isFormInputComponent = (child) => {
  if (typeof child.type === "string") {
    return ["input", "textarea", "select"].includes(child.type);
  }

  return child.props?.name !== undefined;
};

const CustomForm = ({ onSubmit, validate, children, ...props }) => {
  const { handleSubmit, errors } = usePostForm(onSubmit, validate);

  return (
    <form onSubmit={handleSubmit} {...props}>
      {React.Children.map(children, (child) => {
        if (child.props && child.props.name && isFormInputComponent(child)) {
          return React.cloneElement(child, { error: errors[child.props.name] });
        }
        return child;
      })}
    </form>
  );
};

export default CustomForm;
