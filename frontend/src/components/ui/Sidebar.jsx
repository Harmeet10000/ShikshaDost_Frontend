import React from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";


const Sidebar = ({toggleSideBar}) => {
  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-5"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold">Menu</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSideBar}
            className="text-2xl text-red-500"
          >
            <IoMdClose />
          </motion.button>
        </div>
        <a href="#" className="p-2 hover:bg-gray-200 rounded">
          MBBS Abroad
        </a>
        <a href="#" className="p-2 hover:bg-gray-200 rounded">
          All Courses
        </a>
        <a href="/mentors" className="p-2 hover:bg-gray-200 rounded">
          Mentors
        </a>
        <a href="#" className="p-2 hover:bg-gray-200 rounded">
          Articles
        </a>
      </motion.div>
    </>
  );
};

export default Sidebar;
