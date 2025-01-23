import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

const MentorContainer = () => {
  const {user,logout } = useAuth();
  const [activeFunctionality, setActiveFunctionality] = useState("Dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const functionalities = [
    "Dashboard",
    "Mentor Profile",
    "Mentees",
    "Revenue",
    "Update Availability",
    "Create Blog",
    "Published Articles"
  ];

  const handleFunctionalityClick = (func) => {
    setActiveFunctionality(func);
    navigate(`/mentor/${func.toLowerCase().replace(" ", "-")}`);
  };

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  return (
    <div className="">
      
      <header className="flex justify-between items-center p-4 shadow bg-white">
        <h2 className="text-2xl font-semibold">Mentor Dashboard</h2>
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FaUserCircle className="text-3xl" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                onClick={logout}
              >
                <HiOutlineLogout className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      
      <nav className="overflow-x-auto whitespace-nowrap bg-[#172e59] p-4 shadow">
        <div className="flex space-x-4 ">
          {functionalities.map((func) => (
            <button
              key={func}
              onClick={() => handleFunctionalityClick(func)}
              className={`px-2 py-1 rounded ${
                activeFunctionality === func
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {func}
            </button>
          ))}
        </div>
      </nav>

      <main className=" p-4 bg-gray-100 ">
        <Outlet />
      </main>
    </div>
  );
};

export default MentorContainer;
