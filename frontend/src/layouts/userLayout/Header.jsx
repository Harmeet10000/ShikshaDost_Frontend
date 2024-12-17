import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import company_logo from "../../assets/company_logo.png";
import { useForm } from "react-hook-form";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Sidebar from "@/components/ui/Sidebar";
import SearchContainer from "@/components/ui/SearchContainer";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSearch = (data) => {
    console.log("Search Query:", data.query);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSideBar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`header shadow-md mb-10 bg-white ${
        isSticky ? "fixed top-0 left-0 w-full z-50" : ""
      } transition duration-300 ease-in`}
    >
      <div className="container flex items-center justify-between gap-x-5 md:gap-x-10 mx-auto px-4">
        {/* Logo */}
        <a href="/">
          <img
            className="company-logo w-16 h-16 xl:w-24 xl:h-24"
            src={company_logo}
            alt="Company Logo"
          />
        </a>

        {/* Header List */}
        <div className="hidden xl:flex items-center gap-x-5 font-semibold">
          <a href="#" className="header-item">
            MBBS Abroad
          </a>
          <div className="relative">
            <button
              className="flex items-center gap-x-1"
              onClick={toggleDropdown}
            >
              All Courses
              <span>{isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown absolute left-0 mt-2 w-48 bg-[#0B545D] rounded shadow-md text-white p-3 z-10">
                <a href="#" className="flex justify-between p-2 border-b">
                  JEE <FaChevronRight />
                </a>
                <a href="#" className="flex justify-between p-2 border-b">
                  NEET <FaChevronRight />
                </a>
                <a href="#" className="flex justify-between p-2">
                  CUET <FaChevronRight />
                </a>
              </div>
            )}
          </div>
          <a href="/mentors" className="header-item">
            Mentors
          </a>
          <a href="#" className="header-item">
            Articles
          </a>
        </div>

        {/* Search Box and Menu */}
        <div className="flex gap-x-5 items-center">
          {/* Search Input (Hidden on Mobile) */}
          <form onSubmit={handleSubmit(onSearch)} className="hidden xl:flex">
            <input
              {...register("query")}
              placeholder="Search"
              className="px-2 py-1 rounded-l-full border"
            />
            <button className="px-2 py-1 bg-[#0B545D] text-white rounded-r-full">
              <IoSearchOutline />
            </button>
          </form>

          {/* Search Icon for Mobile */}
          <button
            onClick={toggleMobileSearch}
            className="text-2xl xl:hidden"
          >
            <IoSearchOutline />
          </button>

          {/* Hamburger Menu */}
          <div className="text-2xl xl:hidden" onClick={toggleSideBar}>
            <GiHamburgerMenu />
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-x-3">
          <button className="border border-[#0B545D] px-2 py-1 rounded">
            Login
          </button>
          <button className="px-2 py-1 rounded bg-[#0B545D] text-white">
            Signup
          </button>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <SearchContainer toggleMobileSearch={toggleMobileSearch} onSearch={onSearch}/>
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
           <Sidebar toggleSideBar={toggleSideBar}/>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;
