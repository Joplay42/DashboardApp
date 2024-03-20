import { useState } from "react";
import { auth, provider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setPasswordError("");
      console.log(user);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setPasswordError("InvalidEmail");
      }
      if (error.code === "auth/weak-password") {
        setPasswordError("InvalidPassword");
      }
      if (error.code === "auth/missing-password") {
        setPasswordError("MissingPassword");
      }
      if (error.code === "auth/missing-email") {
        setPasswordError("MissingEmail");
      }
    }
  };
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-w-[35rem] w-fit space-y-4 p-10">
      <h1 className="text-2xl text-center font-semibold">Create an account</h1>
      <div className="flex flex-col space-y-2">
        <label>Email :</label>
        <input
          className="border border-neutral-300 p-2 "
          placeholder="Email ... "
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <div className={passwordError != "InvalidEmail" ? `hidden` : `block`}>
          <p className="text-red-500">Invalid Email, already in use</p>
        </div>
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
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <div
          className={passwordError != "InvalidPassword" ? `hidden` : `block`}
        >
          <p className="text-red-500">
            Invalid Password, must be at least 6 characters
          </p>
        </div>
        <div
          className={passwordError != "MissingPassword" ? `hidden` : `block`}
        >
          <p className="text-red-500">Invalid Password</p>
        </div>
      </div>
      <button
        onClick={register}
        className="bg-red-400 text-white py-2 hover:bg-red-300"
      >
        Create account
      </button>
      <p className="text-center text-neutral-500">Or log in with</p>
      <div
        onClick={signInGoogle}
        className="bg-white py-6 rounded-md border border-neutral-200 font-semibold hover:cursor-pointer"
      >
        <div className=" flex space-x-4 justify-center">
          <img className="w-6 h-auto" src="/google.webp" />
          <p>Sign up with google</p>
        </div>
      </div>
    </div>
  );
}
