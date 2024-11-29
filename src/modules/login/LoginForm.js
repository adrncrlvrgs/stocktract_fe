import CustomForm from "components/form/Form";
import useLogin from "./useLogin";
import React from "react";
import { useAuth } from "context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const { handleLogin, error } = useLogin(login);
  return (
    <CustomForm onSubmit={handleLogin} className="max-w-md md:ml-auto w-full">
      <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Sign in</h3>
      <div className="space-y-4">
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
            autoComplete="current-password"
            required
            className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm text-gray-800"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="jajvascript:void(0);"
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
