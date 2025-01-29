import React from "react";

const ProfileOtherDetails = ({mentorDetails}) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold mb-4">About Mentor</h2>
        <p className="text-gray-700  text-lg">
        I love building and shipping customer centric products that positively impact people. Identifying the product market fit and catering to customer needs with a strong bias for action is my area of expertise and I believe is core to building successful product organizations.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {mentorDetails?.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#172e59] text-white text-sm rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOtherDetails;
