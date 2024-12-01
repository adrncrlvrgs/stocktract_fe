import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form"; 
import Input from "components/Input/Input"; 
import useSignUp from "./useSignup"; 
import { validateForm } from "utils/validate"; 

export default function SignUpForm() {
  const { handleSignUp, error, success } = useSignUp();
  const [errors, setErrors] = useState({});

 
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required."),
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
    role: Yup.string().required("Role is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required."),
  });


  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  return (
    <CustomForm
      onSubmit={handleSignUp}
      validate={validate}
      className="max-w-md md:ml-auto w-full"
    >
      <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign up</h3>
      <div className="space-y-4">

        <Input
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Full Name"
          required
          error={errors.name}
        />

        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          required
          error={errors.email}
        />

        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          required
          error={errors.password}
        />

        <Input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          required
          error={errors.confirmPassword}
        />

        <Input
          name="role"
          type="text"
          placeholder="Role (e.g. Manager)"
          required
          error={errors.role}
        />
      </div>

      <div className="!mt-8">
        <button
          type="submit"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/" className="text-blue-600 hover:text-blue-500 font-semibold">
          Log in
        </a>
      </p>
    </CustomForm>
  );
}
