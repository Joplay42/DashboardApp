import { signOut } from "firebase/auth"; // Firebase Auth
import { auth } from "../../config/firebase"; // Firebase Config
import Sidebar from "./Sidebar"; // Components imports
import { useState } from "react"; // UseState import
import Home from "./Home"; // Components imports
import CreateNote from "./CreateNote"; // Components imports
import Settings from "./Settings"; // Components imports

export default function Dashboard({ user }) {
  const [index, setIndex] = useState("0"); // The current page that displays in the dashboard

  /**
   * This method is used to log out the user.
   */
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  /**This return the main code for the dashboard, so the sidebar
   * and the index pages
   */
  return (
    <div className="flex lg:grid lg:grid-cols-4">
      {/** Sidebar */}
      <Sidebar onClick={logout} active={index} setIndex={setIndex} />
      {/** The page that it displays if it is clicked in the sidebar */}
      <div className="w-full lg:col-span-3">
        {index == 0 && <Home />}
        {index == 1 && <CreateNote />}
        {index == 2 && <Settings />}
      </div>
    </div>
  );
}
