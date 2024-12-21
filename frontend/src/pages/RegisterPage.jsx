import React, { useState } from "react";
import register_image from "../assets/register.png";
import { motion, AnimatePresence } from "framer-motion";
import Login from "@/features/authentication/components/Login";
import Signup from "@/features/authentication/components/Signup";

const RegisterPage = () => {
  const [selectedTab, setSelectedTab] = useState("login");

  return (
    <section className="register-section  flex justify-center items-center ">
      <div className="container bg-[#172e59]  flex justify-between items-center rounded-xl">
        <div className="w-full  md:w-3/6 flex justify-center items-center py-5">
          <div className="max-w-[350px]  rounded-xl shadow-lg bg-white border p-5">
            <nav className="flex justify-between items-center relative">
              {["login", "signup"].map((item) => (
                <div
                  key={item}
                  className={`px-1 md:px-3 py-2 w-3/6 text-center rounded-3xl cursor-pointer relative `}
                  onClick={() => setSelectedTab(item)}
                >
                  <span className="text-lg">{item.charAt(0).toUpperCase() + item.slice(1)}</span>

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
            <main className="min-h-[400px]    ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab ? selectedTab.label : "empty"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selectedTab === "login" ? <Login/> : <Signup/>}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
        <div className=" md:w-3/6 hidden md:flex justify-center items-center">
          <img
            className="w-96 h-96"
            src={register_image}
            alt="shiksha-dost register image"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
