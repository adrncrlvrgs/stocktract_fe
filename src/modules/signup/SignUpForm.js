import CustomForm from "components/Form/Form";
import React from "react";
import useSignUp from "./useSignup";
import Input from "components/Input/Input"; // Adjust the import path if needed

export default function SignUpForm() {
  const { handleSignUp, error, success } = useSignUp();

  return (
    <CustomForm onSubmit={handleSignUp} className="max-w-md md:ml-auto w-full">
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
        />

        {/* Role Input Field */}
        <Input
          name="role"
          type="text"
          placeholder="Role (e.g. Manager)"
          required
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
