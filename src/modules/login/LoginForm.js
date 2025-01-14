import React, { useState } from "react";
import CustomForm from "components/Form/Form";
import useLogin from "./useLogin";
import { useAuth } from "context/AuthContext";
import { Input } from "components/Input";

export default function LoginForm() {
  const { login } = useAuth();
  const { handleLogin, error } = useLogin(login);
  const [role, setRole] = useState("user");

  const onSubmit = (data) => {
    handleLogin(data, role);
  };
  return (
    <CustomForm onSubmit={onSubmit} className="max-w-md md:ml-auto w-full">
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

        <div className="space-y-2">
          <p className="text-sm text-gray-600">Log in as:</p>
          <div className="flex gap-4">
            <div
              onClick={() => setRole("user")}
              className={`flex-1 p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                role === "user"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <h4 className="text-lg font-semibold">User</h4>
              <p className="text-sm">Access your personal dashboard.</p>
            </div>

            <div
              onClick={() => setRole("admin")}
              className={`flex-1 p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                role === "admin"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <h4 className="text-lg font-semibold">Admin</h4>
              <p className="text-sm">Manage the system and users.</p>
            </div>
          </div>
        </div>

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
