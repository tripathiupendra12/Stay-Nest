import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        delete
        axios.defaults.headers.common["Authorization"];
        setIsLoggedIn(false);
        navigate("/signin");
    };

    const handleNewListing = async () => {
        try {
            const token = localStorage.getItem("token");
            if(token) {
                navigate("/listings/new");
            } else {
                navigate("/signin");
            }
        } catch (err) {
            navigate("/signin");
        }
    };

    return (
  <nav className="w-full bg-gray-100 backdrop-blur-md border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="h-28 flex items-center justify-between">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/listings/listings/category/All">
            <img
              src="/logo (2).png"
              alt="Logo"
              className="w-16 sm:w-20 hover:scale-105 transition duration-300"
            />
          </Link>
        </div>

        {/* Center Search */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-xl">

            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search listings..."
              className="
                w-full
                pl-12
                pr-4
                py-3
                rounded-full
                bg-gray-50
                border
                border-gray-300
                text-gray-800
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-300
                hover:shadow-md
              "
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 sm:gap-6">

          <button
            onClick={handleNewListing}
            className="
              hidden sm:block
              px-5
              py-2.5
              rounded-full
              bg-blue-700
              from-blue-600
              to-indigo-600
              text-white
              font-medium
              shadow-md
              hover:shadow-lg
              hover:bg-gray-700
              hover:scale-105
              transition-all
              duration-300
            "
          >
            + Add Listing
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="
                text-md
                font-medium
                text-gray-900
                hover:text-red-600
                hover:scale-105
                transition
                duration-200
              "
            >
              <LogOut className="h-8 w-10 pl-2 mt-4"/>
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="
                font-medium
                text-gray-900
                hover:text-blue-600
                hover:scale-110
                transition
                duration-200
              "
            >
              <LogIn className="h-8 w-10 pr-2 mt-4"/>
              Login
            </Link>
          )}
        </div>

      </div>

      {/* Mobile Add Listing Button */}
      <div className="sm:hidden pb-4">
        <button
          onClick={handleNewListing}
          className="
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white
            font-medium
            shadow-md
          "
        >
          + Add Listing
        </button>
      </div>

    </div>
  </nav>
);
}

export default Navbar;