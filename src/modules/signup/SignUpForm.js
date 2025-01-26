import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/form/Form";
import { Input } from "components/Input";
import useSignUp from "./useSignup";
import { validateForm } from "utils/validate";
import { AvatarUpload } from "components/Input/AvatarUpload";
import { Button } from "components/Button";

export default function SignUpForm() {
  const { handleSignUp, error, success } = useSignUp();
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character."
      ),
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
      className="max-w-md w-full"
    >
      <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign up</h3>
      <div className="space-y-4">
        <div className="flex justify-center">
          <AvatarUpload
            name="profileImagePath"
            size="w-32 h-32"
            className="mb-4"
          />
        </div>
        <Input
          name="firstName"
          type="text"
          autocomplete="given-name"
          placeholder="First Name"
          required
          error={errors.firstName}
        />
        <Input
          name="lastName"
          type="text"
          autocomplete="family-name"
          placeholder="Last Name"
          required
          error={errors.lastName}
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
          autoComplete="password"
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
      </div>
      <div className="!mt-8">
        <Button
          type="submit"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </Button>
      </div>
    </CustomForm>
  );
}
