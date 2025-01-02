import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import CategorySidebar from "./CategorySidebar";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Assuming Avatar component is part of Shadcn UI
import { Link } from "react-router-dom";

const Sidebar = ({ toggleSideBar }) => {
  const { user, logout } = useAuth();
  const [categorySidebar, setCategorySidebar] = useState(false);

  const toggleCategorySidebar = () => {
    setCategorySidebar(!categorySidebar);
  };

  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-5"
      >
        <div className="flex justify-between items-center mb-5">
          <div>
            {user && (
              <div className="flex items-center ">
                <Avatar className="mr-3">
                  <AvatarImage
                    src={user?.image || "https://github.com/shadcn.png"}
                    alt={user?.name}
                  />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className=" font-bold">{user?.name}</p>
                  {/* <p className=" text-sm">{user?.email}</p> */}
                </div>
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSideBar}
            className="text-2xl text-white-500"
          >
            <IoMdClose />
          </motion.button>
        </div>
        <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300 ">
          <Link to={"/"}>
            <span>Home</span>
          </Link>
        </div>
        <Separator />
        {!user && (
          <>
            <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
              <Link to={"/register"}>
                <span>Get Started</span>
              </Link>
            </div>
            <Separator />
          </>
        )}
        {user && (
          <>
            <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
              <a href="#">Your Profile</a>
            </div>
            <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
              <a href="#">Your Mentorship</a>
            </div>
            <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
              <a href="#">Your Articles</a>
            </div>
            <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
              <a href="#">Your Quizzes</a>
            </div>
            <Separator />
          </>
        )}

        <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
          <a href="#">MBBS Abroad</a>
        </div>
        <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
          <a href="/mentors">Mentors</a>
        </div>

        <div
          className="group p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300 flex justify-between items-center"
          onClick={toggleCategorySidebar}
        >
          <a href="#">Study Material</a>
          <span className=" transform group-hover:translate-x-2 transition-transform duration-300 group-hover:text-green-500">
            <FaChevronRight />
          </span>
        </div>

        <div className="p-2 cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
          <a href="#">Articles</a>
        </div>
        <Separator />

        {/* Logout button */}
        {user && (
          <div
            className="p-2 flex justify-between items-center cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300"
            onClick={logout}
          >
            Logout
            <span className="text-2xl">
              <IoIosLogOut />
            </span>
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {categorySidebar && (
          <CategorySidebar toggleCategorySidebar={toggleCategorySidebar} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
