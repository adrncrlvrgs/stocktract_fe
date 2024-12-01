import React,{useState} from "react";
import serialize from "form-serialize";


const usePostForm = (onSubmit, validate) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false) {
      form.classList.add("was-validated");
      return false;
    }

    const serializedData = serialize(form, { hash: true });
    const validationErrors = validate(serializedData);

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, update the error state
      setErrors(validationErrors);
    } else {
      // If no validation errors, clear errors and submit form data
      setErrors({});
      onSubmit(serializedData);
    }
  };

  return { handleSubmit, errors };
};

const CustomForm = ({ onSubmit, validate, children, ...props }) => {
  const { handleSubmit, errors} = usePostForm(onSubmit, validate);

  return (
    <form onSubmit={handleSubmit} {...props}>
      {React.Children.map(children, (child) => {
        // Add errors prop to each Input field if it's an Input component
        if (child.type === "Input") {
          console.log("ytue")
          return React.cloneElement(child, { error: errors[child.props.name] });
        }
        return child;
      })}
    </form>
  );
};

export default CustomForm;
