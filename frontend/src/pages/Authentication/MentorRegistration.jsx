import React from 'react'
import { LogIn } from 'lucide-react';
import MentorLogin from './MentorLogin';
const MentorRegistration = ({onFlip}) => {
  return (
    <div className="bg-white px-8 py-4 rounded-lg shadow-lg w-full max-w-md h-[450px]">
    <MentorLogin/>
    <button
        type="button"
        onClick={onFlip}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-md"
      >
        <LogIn size={20} />
        Back to User Login
      </button>
  </div>
  )
}

export default MentorRegistration