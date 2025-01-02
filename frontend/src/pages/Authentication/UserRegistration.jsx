import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "@/pages/Authentication/Login";
import Signup from "@/pages/Authentication/Signup";

const UserRegistration = ({ onFlip }) => {
  const [selectedTab, setSelectedTab] = useState("login");

  return (
    <div className="bg-white border p-4 rounded-lg shadow-lg w-full max-w-md h-[580px]">
      <nav className="flex justify-between items-center relative">
        {["login", "signup"].map((item) => (
          <div
            key={item}
            className={`px-1 md:px-3 py-2 w-3/6 text-center rounded-3xl cursor-pointer relative`}
            onClick={() => setSelectedTab(item)}
          >
            <span className="text-lg">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>

            {selectedTab === item && (
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-teal rounded-full"
                layoutId="underline"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </div>
        ))}
      </nav>
      <main className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab === "login" ? <Login /> : <Signup />}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        type="button"
        onClick={onFlip}
        className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
      >
        <LogIn size={20} />
        Login as Mentor
      </button>
    </div>
  );
};

export default UserRegistration;
