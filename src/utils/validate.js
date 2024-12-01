/**
 * @param {Object} data - The form data to be validated.
 * @param {Yup.ObjectSchema} schema - The Yup validation schema to be applied.
 * @param {Function} setErrors - Function to set the form errors in state.
 * @returns {Object} Validation errors or an empty object if validation is successful.
 */
export const validateForm = async (data, schema, setErrors) => {
  try {
    await schema.validate(data, { abortEarly: false });
    setErrors({});
    return {};
  } catch (err) {
    const validationErrors = err.inner.reduce((acc, currErr) => {
      acc[currErr.path] = currErr.message;
      return acc;
    }, {});
    setErrors(validationErrors);
    return validationErrors;
  }
};
