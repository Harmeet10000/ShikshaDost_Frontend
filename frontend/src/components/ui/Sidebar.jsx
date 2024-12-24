import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import CategorySidebar from "./CategorySidebar";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Assuming Avatar component is part of Shadcn UI

const Sidebar = ({ toggleSideBar }) => {
  const { user, logout } = useAuth();
  const [categorySidebar, setCategorySidebar] = useState(false);

  const toggleCategorySidebar = () => {
    setCategorySidebar(!categorySidebar);
  };

  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-teal shadow-lg z-50 flex flex-col p-5"
      >
        <div className="flex justify-end items-center mb-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSideBar}
            className="text-2xl text-white-500"
          >
            <IoMdClose />
          </motion.button>
        </div>

        {user ? (
          <div className="flex items-center mb-5">
            <Avatar className="mr-3">
              <AvatarImage src={user?.image || "/path/to/default-avatar.png"} alt={user?.username} />
              <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-bold">{user?.username}</p>
              <p className="text-white text-sm">{user?.email}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-2 cursor-pointer hover:text-white hover:font-bold">
              <span>Home</span>
            </div>
            <Separator />
            <div className="p-2 cursor-pointer hover:text-white hover:font-bold">
              <span>Get Started</span>
            </div>
            <Separator />
          </>
        )}

        <div className="p-2 cursor-pointer hover:text-white hover:font-bold">
          <a href="#">MBBS Abroad</a>
        </div>
        <Separator />
        <div className="group p-2 cursor-pointer hover:text-white hover:font-bold flex justify-between items-center" onClick={toggleCategorySidebar}>
          <a href="#">All Courses</a>
          <span className="group-hover:text-white transform group-hover:translate-x-2 transition-transform duration-300">
            <FaChevronRight />
          </span>
        </div>

        <Separator />
        <div className="p-2 cursor-pointer hover:text-white hover:font-bold">
          <a href="/mentors">Mentors</a>
        </div>
        <Separator />
        <div className="p-2 cursor-pointer hover:text-white hover:font-bold">
          <a href="#">Articles</a>
        </div>
        <Separator />

        {/* Logout button */}
        {user && (
          <div
            className="p-2 flex justify-between items-center cursor-pointer hover:text-white hover:font-bold"
            onClick={logout}
          >
            Logout
            <span className="text-2xl">
              <IoIosLogOut />
            </span>
          </div>
        )}
        <Separator />
      </motion.div>
      <AnimatePresence>
        {categorySidebar && <CategorySidebar toggleCategorySidebar={toggleCategorySidebar} />}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
