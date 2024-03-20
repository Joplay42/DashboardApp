import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      {!user ? (
        <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
          <Auth />
        </div>
      ) : (
        <div>
          <Dashboard user={user} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
