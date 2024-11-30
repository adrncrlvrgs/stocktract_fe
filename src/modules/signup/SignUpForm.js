import CustomForm from "components/Form/Form";
import React from "react";
import useSignUp from "./useSignup";

export default function SignUpForm() {
  const { handleSignUp, error, success } = useSignUp();
  return (
    <CustomForm onSubmit={handleSignUp} className="max-w-md md:ml-auto w-full">
      <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign up</h3>
      <div className="space-y-4">
        <div>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
            placeholder="Email address"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
            placeholder="Password"
          />
        </div>
        <div>
          <input
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
            placeholder="Confirm Password"
          />
        </div>
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
