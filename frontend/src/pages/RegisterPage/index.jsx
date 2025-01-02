import FlipCard from "@/components/FlipCard";
import MentorRegistration from "@/pages/Authentication/MentorRegistration";
import UserRegistration from "@/pages/Authentication/UserRegistration";
import React, { useState } from "react";
import background from "../../assets/registerPageBg.jpg";

const RegisterPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div
        className="h-[750px] md:min-h-screen flex items-center justify-center relative bg-cover bg-center  rounded-b-[50px] md:rounded-b-[100px]"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#172e59] opacity-70 rounded-b-[50px] md:rounded-b-[100px] "></div>

        {/* Content */}
        <div className="relative w-full max-w-md z-10 rounded-xl">
          <FlipCard
            isFlipped={isFlipped}
            frontSide={<UserRegistration onFlip={handleFlip} />}
            backSide={<MentorRegistration onFlip={handleFlip} />}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
