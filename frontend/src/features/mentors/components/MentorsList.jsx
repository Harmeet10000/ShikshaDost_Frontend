import React from "react";
import mentor_profile_image from "../../../assets/mentor_profile.jpg";

const MentorsList = () => {
  return (
    <div className="mentors-section  ">
      <div className="container mx-auto  flex flex-col gap-y-5 px-4 md:px-8">
        <h1 className="text-center text-2xl md:text-4xl font-bold ">
          Well Experienced <span className="text-[#0B545D]">Mentors</span>
        </h1>

        <div className="mentors-list grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div className="mentor-card p-6 border rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white">
            <div className="mentor-profile-image w-36 h-36 sm:w-48 sm:h-48">
              <img
                src={mentor_profile_image}
                alt="mentor_profile"
                className="w-full h-full object-cover rounded-full border-4 border-[#0B545D]"
              />
            </div>

            <div className="mentor-details flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-[#0B545D] mb-2">
                Anant Singh
              </h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nesciunt aspernatur fuga ipsum dolores debitis quia libero in
                veritatis perspiciatis. Ex excepturi quos saepe.
              </p>
              <button className="px-5 py-2 bg-[#0B545D] text-white rounded-lg hover:bg-[#083D48] transition duration-300">
                View More
              </button>
            </div>
          </div>

          <div className="mentor-card p-6 border rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white">
            <div className="mentor-profile-image w-36 h-36 sm:w-48 sm:h-48">
              <img
                src={mentor_profile_image}
                alt="mentor_profile"
                className="w-full h-full object-cover rounded-full border-4 border-[#0B545D]"
              />
            </div>

            <div className="mentor-details flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-[#0B545D] mb-2">
                Anant Singh
              </h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nesciunt aspernatur fuga ipsum dolores debitis quia libero in
                veritatis perspiciatis. Ex excepturi quos saepe.
              </p>
              <button className="px-5 py-2 bg-[#0B545D] text-white rounded-lg hover:bg-[#083D48] transition duration-300">
                View More
              </button>
            </div>
          </div>

          <div className="mentor-card p-6 border rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white">
            <div className="mentor-profile-image w-36 h-36 sm:w-48 sm:h-48">
              <img
                src={mentor_profile_image}
                alt="mentor_profile"
                className="w-full h-full object-cover rounded-full border-4 border-[#0B545D]"
              />
            </div>

            <div className="mentor-details flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-[#0B545D] mb-2">
                Anant Singh
              </h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nesciunt aspernatur fuga ipsum dolores debitis quia libero in
                veritatis perspiciatis. Ex excepturi quos saepe.
              </p>
              <button className="px-5 py-2 bg-[#0B545D] text-white rounded-lg hover:bg-[#083D48] transition duration-300">
                View More
              </button>
            </div>
          </div>

          <div className="mentor-card p-6 border rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white">
            <div className="mentor-profile-image w-36 h-36 sm:w-48 sm:h-48">
              <img
                src={mentor_profile_image}
                alt="mentor_profile"
                className="w-full h-full object-cover rounded-full border-4 border-[#0B545D]"
              />
            </div>

            <div className="mentor-details flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-[#0B545D] mb-2">
                Anant Singh
              </h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nesciunt aspernatur fuga ipsum dolores debitis quia libero in
                veritatis perspiciatis. Ex excepturi quos saepe.
              </p>
              <button className="px-5 py-2 bg-[#0B545D] text-white rounded-lg hover:bg-[#083D48] transition duration-300">
                View More
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center  ">
          <button className="px-3 py-2 bg-[#0B545D] rounded text-white font-bold min-w-[150px]">
            View All Mentors
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorsList;
