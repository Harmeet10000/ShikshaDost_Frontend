import React, { useState } from "react";
import company_logo from "../../assets/company_logo.png";
import { useForm } from "react-hook-form";
import { FaChevronRight,FaChevronDown,FaChevronUp } from "react-icons/fa";



const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle the dropdown visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSearch = (data) => {
    console.log("Search Query:", data.query);
    // Perform your search logic here
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <nav className="header  ">
      <div className="container flex items-center justify-center gap-x-20 mx-auto">
        <a href="/">
          <img
            className="company-logo w-24 h-24 "
            src={company_logo}
            alt="Shiksha Dost Logo"
          />
        </a>

        <div className="header-list flex items-center gap-x-5">
          <a href="#" className="header-item mbbs_abroad">
            MBBS Abroad
          </a>
          <div className="header-item relative ">
            <button
              className="all_courses flex items-center gap-x-1"
              onClick={toggleDropdown}
            >
              All Courses
              <span className="text-sm">{isDropdownOpen ? <FaChevronUp/> : <FaChevronDown/>}</span> 
            </button>
            {isDropdownOpen && (
              <div className="dropdown absolute left-0 mt-2 w-48 bg-[#118B50]  rounded shadow-md text-white p-3 rounded">
                <a href="#" className="dropdown-item p-2  flex justify-between border-b">
                  JEE <span className="text-sm"><FaChevronRight/></span>
                </a>
                <a href="#" className="dropdown-item p-2  flex justify-between border-b">
                  NEET <span className="text-sm"><FaChevronRight/></span>
                </a>
                <a href="#" className="dropdown-item p-2  flex justify-between">
                  CUET <span className="text-sm"><FaChevronRight/></span>
                </a>
              </div>
            )}
          </div>
          <a href="/mentors" className="header-item mentors">
            Mentors
          </a>
          <a href="#" className="header-item articles">
            Articles
          </a>
        </div>

        <div className="search-box  rounded">
          <form className="flex" onSubmit={handleSubmit(onSearch)}>
            <input
              {...register("query", { required: "Please enter a search term" })}
              placeholder="Search..."
              className="px-2 py-1 border border-black rounded"
            />

            <button
              type="submit"
              className="search-button px-2 py-1 bg-[#118B50] rounded text-white"
            >
              Search
            </button>
          </form>
        </div>

        <div className="register-button flex items-center gap-x-3">
          <button className="login-button border border-[#118B50] px-2 py-1 rounded ">
            Login
          </button>
          <button className="signup-button  px-2 py-1 rounded bg-[#118B50] text-white">
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
