import React from 'react'
import { motion } from "framer-motion";
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';

const SearchContainer = ({toggleMobileSearch,onSearch}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div>
      <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-full h-screen bg-white z-50 p-5 flex flex-col"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">Search</h2>
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMobileSearch}
                  className="text-2xl text-red-500"
                >
                  <IoMdClose />
                </motion.button>
              </div>
              {/* Search Input */}
              <form
                onSubmit={handleSubmit(onSearch)}
                className="flex items-center gap-x-2"
              >
                <input
                  {...register("query")}
                  placeholder="Type to search..."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#0B545D]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B545D] text-white rounded-full"
                >
                  <IoSearchOutline />
                </button>
              </form>
            </motion.div>
    </div>
  )
}

export default SearchContainer