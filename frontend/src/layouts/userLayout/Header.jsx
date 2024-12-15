import React, { useState, useEffect } from "react";
import company_logo from "../../assets/company_logo.png";
import { useForm } from "react-hook-form";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // State to track if header is sticky

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

  useEffect(() => {
    const handleScroll = () => {
      // Make header sticky if scrolled down
      setIsSticky(window.scrollY > 0);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`header shadow-md mb-5 ${
        isSticky ? "fixed top-0 left-0 w-full bg-black text-white z-50" : ""
      } transition duration-300 ease-in`}
    >
      <div className="container flex items-center justify-between gap-x-5 md:gap-x-10 mx-auto px-4">
        <a href="/" className="">
          <img
            className="company-logo w-24 h-24"
            src={company_logo}
            alt="Shiksha Dost Logo"
          />
        </a>

        <div className="header-list hidden xl:flex items-center gap-x-5">
          <a href="#" className="header-item mbbs_abroad">
            MBBS Abroad
          </a>
          <div className="header-item relative">
            <button
              className="all_courses flex items-center gap-x-1"
              onClick={toggleDropdown}
            >
              All Courses
              <span className="text-sm">
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown absolute left-0 mt-2 w-48 bg-[#0B545D] rounded shadow-md text-white p-3 z-10">
                <a
                  href="#"
                  className="dropdown-item p-2 flex justify-between border-b"
                >
                  JEE{" "}
                  <span className="text-sm">
                    <FaChevronRight />
                  </span>
                </a>
                <a
                  href="#"
                  className="dropdown-item p-2 flex justify-between border-b"
                >
                  NEET{" "}
                  <span className="text-sm">
                    <FaChevronRight />
                  </span>
                </a>
                <a href="#" className="dropdown-item p-2 flex justify-between">
                  CUET{" "}
                  <span className="text-sm">
                    <FaChevronRight />
                  </span>
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

        <div className="search-box rounded">
          <form className="hidden xl:flex" onSubmit={handleSubmit(onSearch)}>
            <input
              {...register("query", { required: "Please enter a search term" })}
              placeholder="Search..."
              className="px-2 py-1 border border-black rounded"
            />
            <button
              type="submit"
              className="search-button px-2 py-1 bg-[#0B545D] rounded text-white"
            >
              Search
            </button>
          </form>
        </div>

        <div className="register-button hidden xl:flex items-center gap-x-3">
          <button className="login-button border border-[#0B545D] px-2 py-1 rounded">
            Login
          </button>
          <button className="signup-button px-2 py-1 rounded bg-[#0B545D] text-white">
            Signup
          </button>
        </div>

        <div className="block xl:hidden text-2xl">
          <span>
            <GiHamburgerMenu />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
