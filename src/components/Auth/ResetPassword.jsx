import { useState } from "react";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const resetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (error) {
      console.error(error);
      setResetEmailSent(false);
    }
  };

  return (
    <div className="flex flex-col min-w-[35rem] w-fit p-10">
      {!resetEmailSent ? (
        <div className=" space-y-4">
          <h1 className="text-2xl text-center font-semibold pb-6">
            Reset password
          </h1>
          <div className="flex flex-col space-y-2">
            <label>Enter your email :</label>
            <input
              className="border border-neutral-300 p-2 "
              placeholder="Email ... "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={resetEmail}
            className="bg-red-400 text-white py-2 w-full hover:bg-red-300"
          >
            Reset password
          </button>
        </div>
      ) : (
        <p className="text-center">Email succesfuly sent</p>
      )}
    </div>
  );
}
