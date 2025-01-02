import React from 'react'
import { LogIn } from 'lucide-react';
const MentorRegistration = ({onFlip}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-[400px]">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Mentor Login</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Mentor ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your mentor ID"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Login as Mentor
      </button>
      <button
        type="button"
        onClick={onFlip}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
      >
        <LogIn size={20} />
        Back to User Login
      </button>
    </form>
  </div>
  )
}

export default MentorRegistration