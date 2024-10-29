import { Page } from "components/page";
import React from "react";
import LoginForm from "./LoginForm";

export default function index() {
  return (
    <Page>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div>
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                Stocktract
              </h2>
              <p className="text-sm mt-6 text-gray-800">
                Your Ultimate Web-Based Inventory Management Solution.
              </p>
              <p claclassName="text-sm mt-12 text-gray-800">
                Don't have an account{" "}
                <a
                  href="/"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Register here
                </a>
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </Page>
  );
}
