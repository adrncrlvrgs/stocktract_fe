import CustomForm from "components/Form/Form";
import useLogin from "./useLogin";
import React from "react";
import { useAuth } from "context/AuthContext";
import Input from "components/Input/Input"; 

export default function LoginForm() {
  const { login } = useAuth();
  const { handleLogin, error } = useLogin(login);
  return (
    <CustomForm onSubmit={handleLogin} className="max-w-md md:ml-auto w-full">
      <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign in</h3>
      <div className="space-y-4">
        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          required
        />
        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          required
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center">
            <Input
              name="remember-me"
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-800">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>

      <div className="!mt-8">
        <button
          type="submit"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Log in
        </button>
      </div>
    </CustomForm>
  );
}
