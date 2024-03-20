import { GoHomeFill } from "react-icons/go"; // React Icons
import { TiPlus } from "react-icons/ti"; // React Icons
import { IoIosSettings } from "react-icons/io"; // React Icons
import { MdLogout } from "react-icons/md"; // React Icons
import { RiMenu2Fill } from "react-icons/ri"; // React Icons
import { useState } from "react"; // UseState imports

export default function Sidebar({ onClick, active, setIndex }) {
  /**
   * This method is used to open the mobile menu when the screen width
   * is in mobile definition.
   */
  const openMobileMenu = () => {
    var menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  };

  //This returns the sidebar for the dashboard
  return (
    <div className="border border-r-2 border-neutral-200 px-4 flex lg:block">
      {/** Mobile menu */}
      <div className="lg:hidden h-screen">
        {/** Menu button */}
        <RiMenu2Fill className="w-8 h-auto pt-10" onClick={openMobileMenu} />
      </div>
      {/** Menu */}
      <div
        id="menu"
        className="hidden fixed left-16 px-8 lg:px-0 z-50 lg:left-0 border border-r lg:border-0 bg-white lg:static pb-4 h-screen lg:flex flex-col justify-between"
      >
        <div>
          <div className="p-4 pt-10 pb-20">
            {/** Logo */}
            <h1 className="font-semibold text-2xl">
              Jonathan
              <span className="text-red-700 text-xl font-bold">.Note</span>
            </h1>
          </div>
          {/** List pages */}
          <div className="text-neutral-500 cursor-pointer">
            {/** Home index */}
            <div
              className={
                // Check if index is clicked
                active == 0
                  ? `flex items-center space-x-2 p-4 bg-neutral-100 rounded-full border border-neutral-300 text-neutral-800`
                  : `flex items-center space-x-2 p-4 hover:text-red-700 group`
              }
              // Set index
              onClick={() => setIndex(0)}
            >
              <GoHomeFill className="w-6 h-auto transform ease-in-out duration-300 group-hover:translate-x-1" />
              <p className="font-medium transform ease-in-out duration-300 group-hover:translate-x-1">
                Home
              </p>
            </div>
            {/** New note index */}
            <div
              className={
                // Check if index is clicked
                active == 1
                  ? `flex items-center space-x-2 p-4 bg-neutral-100 rounded-full border border-neutral-300 text-neutral-800`
                  : `flex items-center space-x-2 p-4 hover:text-red-700 group`
              }
              // Set index
              onClick={() => setIndex(1)}
            >
              <TiPlus className="w-6 h-auto transform ease-in-out duration-300 group-hover:translate-x-1" />
              <p className="font-medium transform ease-in-out duration-300 group-hover:translate-x-1">
                New note
              </p>
            </div>
            {/** Settings index */}
            <div
              className={
                // Check if index is clicked
                active == 2
                  ? `flex items-center space-x-2 p-4 bg-neutral-100 rounded-full border border-neutral-300 text-neutral-800`
                  : `flex items-center space-x-2 p-4 hover:text-red-700 group`
              }
              // Set index
              onClick={() => setIndex(2)}
            >
              <IoIosSettings className="w-6 h-auto transform ease-in-out duration-300 group-hover:translate-x-1" />
              <p className="font-medium transform ease-in-out duration-300 group-hover:translate-x-1">
                Settings
              </p>
            </div>
          </div>
        </div>
        {/** Log out button */}
        <div
          onClick={onClick}
          className="flex items-center space-x-2 text-red-400 border border-neutral-300 px-4 py-6 rounded-lg cursor-pointer hover:bg-neutral-100 transition ease-in-out duration-500 hover:shadow-md hover:bg-opacity-100 group"
        >
          <MdLogout className="w-6 h-auto transform ease-in-out duration-500 group-hover:translate-x-4" />
          <p className="font-medium transform ease-in-out duration-500 group-hover:translate-x-4">
            Log out
          </p>
        </div>
      </div>
    </div>
  );
}
