import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LogIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setPasswordError("");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/invalid-credential") {
        setPasswordError("InvalidAccount");
      }
      if (error.code === "auth/missing-password") {
        setPasswordError("MissingPassword");
      }
      if (error.code === "auth/invalid-email") {
        setPasswordError("MissingEmail");
      }
    }
  };

  return (
    <div className="flex flex-col min-w-[35rem] w-fit space-y-4 p-10">
      <h1 className="text-2xl text-center font-semibold">Login</h1>
      <div className="flex flex-col space-y-2">
        <label>Email :</label>
        <input
          className="border border-neutral-300 p-2 "
          placeholder="Email ... "
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <div className={passwordError != "MissingEmail" ? `hidden` : `block`}>
          <p className="text-red-500">Invalid Email</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label>Password :</label>
        <input
          type="password"
          className="border border-neutral-300 p-2 "
          placeholder="Password ... "
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <div
          className={passwordError != "MissingPassword" ? `hidden` : `block`}
        >
          <p className="text-red-500">Invalid Password</p>
        </div>
      </div>
      <div className={passwordError != "InvalidAccount" ? `hidden` : `block`}>
        <p className="text-red-500">
          The email or the password doesn't match any account
        </p>
      </div>
      <button
        onClick={login}
        className="bg-red-400 text-white py-2 hover:bg-red-300"
      >
        Sign in
      </button>
    </div>
  );
}
