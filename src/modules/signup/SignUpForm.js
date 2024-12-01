import CustomForm from "components/Form/Form";
import React, { useState } from "react";
import useSignUp from "./useSignup";
import Input from "components/Input/Input"; // Adjust the import path if needed

export default function SignUpForm() {
  const { handleSignUp, error, success } = useSignUp();
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (data) => {
    const validationErrors = {}; // Use this object to collect errors

    // Validation checks
    if (!data.name) {
      validationErrors.name = "Full Name is required.";
    }
    if (!data.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Email is invalid.";
    }
    if (!data.password) {
      validationErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }
    if (!data.role) {
      validationErrors.role = "Role is required.";
    }

    setErrors(validationErrors); // Set the errors state after validation
    return validationErrors; // Return the validation errors
  };

  return (
    <CustomForm
      onSubmit={handleSignUp}
      validate={validate}
      className="max-w-md md:ml-auto w-full"
    >
      <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign up</h3>
      <div className="space-y-4">
        {/* Full Name Input Field */}
        <Input
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Full Name"
          required
         
        />
        {/* Email Input Field */}
        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          required
          
        />
        {/* Password Input Field */}
        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          required
          error={errors.password} // Pass the error message for password field
        />
        {/* Role Input Field */}
        <Input
          name="role"
          type="text"
          placeholder="Role (e.g. Manager)"
          required
          error={errors.role} // Pass the error message for role field
        />
      </div>

      {/* Submit Button */}
      <div className="!mt-8">
        <button
          type="submit"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button>
      </div>

      {/* Log in Link */}
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/" className="text-blue-600 hover:text-blue-500 font-semibold">
          Log in
        </a>
      </p>
    </CustomForm>
  );
}
