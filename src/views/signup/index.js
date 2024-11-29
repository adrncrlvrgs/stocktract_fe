import React from "react";
import SignUpForm from "modules/signup/SignUpForm";

export default function index() {
  return (
    <React.Fragment>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div>
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                Stocktract.
              </h2>
              <p className="text-sm mt-6 mb-1 text-gray-800">
                Your Ultimate Web-Based Inventory Management Solution.
              </p>
              <p className="text-sm mt-12 text-gray-800">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Log in here
                </a>
              </p>
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
