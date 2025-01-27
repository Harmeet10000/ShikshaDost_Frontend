import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import company_logo from "../../assets/company_logo.png";
import { useForm } from "react-hook-form";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";

import Sidebar from "@/components/Sidebar";
import SearchContainer from "@/components/SearchContainer";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const { register, handleSubmit } = useForm();

  // on search
  const onSearch = (data) => {
    console.log("Search Query:", data.query);
  };

  // state management
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSideBar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Set initial theme
    if (isDarkMode) document.documentElement.classList.add("dark");
  }, [isDarkMode]);

  return (
    <nav
      className={`header shadow-md bg-white ${
        isSticky ? "fixed top-0 left-0 w-full z-50" : ""
      } transition duration-300 ease-in`}
    >
      <div className="container flex items-center justify-between gap-x-5 md:gap-x-10 mx-auto px-4 ">
        <div className="flex justify-between items-center gap-x-5">
          <a href="/">
            <img
              className="company-logo w-16 h-16 xl:w-24 xl:h-24"
              src={company_logo}
              alt="Company Logo"
            />
          </a>
          <div className="hidden xl:flex gap-x-5 items-center px-3 py-2 rounded-full border bg-gray-100">
            <form onSubmit={handleSubmit(onSearch)} className="hidden xl:flex">
              <input
                {...register("query")}
                placeholder="What are you looking for?"
                className="px-2 py-2  border-none bg-gray-100 w-96 text-black focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <button className="px-3 bg-[#172e59] text-white rounded-full">
                <IoSearchOutline />
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-3">
          <button onClick={toggleMobileSearch} className="text-2xl xl:hidden">
            <IoSearchOutline />
          </button>

          <div className="text-2xl xl:hidden" onClick={toggleSideBar}>
            <GiHamburgerMenu />
          </div>
        </div>
        {/* Header List */}

        <div className="hidden xl:flex items-center gap-x-5 relative">
          <div className="flex items-center gap-x-5 font-semibold">
            <a href="#" className="header-item">
              MBBS Abroad
            </a>

            <a href="/mentors" className="header-item">
              Mentors
            </a>
            <a href="/articles" className="header-item">
              Articles
            </a>
          </div>

          {user ? (
            <div
              className="user-profile cursor-pointer flex items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span> */}
            </div>
          ) : (
            <Link
              to={"/register"}
              className="px-3 py-3 rounded bg-[#172e59] text-white text-lg"
              aria-label="Signup to Shiksha-Dost"
            >
              <span>Get Started</span>
            </Link>
          )}

          {user && isDropdownOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white rounded shadow-md border z-50">
              <div>
                <div>
                  <div className="group px-4 py-2 flex items-center  transition-all font-bold">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {user?.name || "User"}
                  </div>
                  <Separator />
                </div>

                <div className="flex flex-col ">
                  <a
                    href="my-profile"
                    className="group px-4 py-2 hover:translate-x-2 hover:text-green-500 transition-transform"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="group px-4 py-2 hover:translate-x-2 hover:text-green-500 transition-transform"
                  >
                    Your Quizzes
                  </a>
                  <a
                    href="#"
                    className="group px-4 py-2 hover:translate-x-2 hover:text-green-500 transition-transform"
                  >
                    Your Mentors
                  </a>
                  <a
                    href="#"
                    className="group px-4 py-2 hover:translate-x-2 hover:text-green-500 transition-transform"
                  >
                    Your Articles
                  </a>
                  <Separator />
                </div>

                <div
                  className="group px-4 py-2 hover:translate-x-2 hover:text-green-500 transition-transform flex justify-between items-center cursor-pointer"
                  onClick={logout}
                >
                  Logout
                  <span className="text-2xl">
                    <IoIosLogOut />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <SearchContainer
              toggleMobileSearch={toggleMobileSearch}
              onSearch={onSearch}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && <Sidebar toggleSideBar={toggleSideBar} />}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;
