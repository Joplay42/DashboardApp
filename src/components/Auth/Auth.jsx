import { useState } from "react";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Register from "./Register";
import LogIn from "./LogIn";
import ResetPassword from "./ResetPassword";

export default function Auth() {
  const [accountCreated, setAccountCreated] = useState("Register");

  return (
    <div className="space-y-10">
      <div className="flex flex-col min-w-[35rem] w-fit space-y-4 bg-white p-10 shadow-md rounded-xl border border-neutral-200">
        {accountCreated == "Register" ? (
          <div>
            <Register />
            <p>
              Already have an account?{" "}
              <button
                className="text-red-600"
                onClick={() => setAccountCreated("Login")}
              >
                Sign in
              </button>
            </p>
          </div>
        ) : accountCreated == "Login" ? (
          <div>
            <LogIn />
            <div className="flex justify-between">
              <p>
                Dont have an account?{" "}
                <button
                  className="text-red-600"
                  onClick={() => setAccountCreated("Register")}
                >
                  Register now
                </button>
              </p>
              <button
                className="text-red-600"
                onClick={() => setAccountCreated("ResetPassword")}
              >
                Forgot your password?
              </button>
            </div>
          </div>
        ) : (
          accountCreated == "ResetPassword" && (
            <div>
              <ResetPassword />
              <button
                className="text-red-600"
                onClick={() => setAccountCreated("Login")}
              >
                Go back
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
