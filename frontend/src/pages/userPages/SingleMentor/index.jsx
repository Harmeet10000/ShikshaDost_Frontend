import { getSingleMentorDetails } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GoArrowLeft } from "react-icons/go";
import { MdCurrencyRupee, MdTimer } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { extractDate } from "@/utils/extractDate";

const SingleMentor = () => {
  const { mentorId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: "" });
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  const {
    data: mentorDetails,
    isLoading,
    isError,
  } = useQuery(
    ["mentorDetails", mentorId],
    () => getSingleMentorDetails(mentorId),
    {
      enabled: !!mentorId,
    }
  );

  if (isLoading) {
    return <div>Loading mentors...</div>;
  }

  if (isError) {
    return <div>Error fetching mentors. Please try again later.</div>;
  }

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const handleContinue = () => {
    const { formattedDate, formattedTime } = extractDate(formData.date);
    console.log(formattedDate, formattedTime);
    setFormattedDate(formattedDate);
    setFormattedTime(formattedTime);
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <div className="px-10  flex py-10 gap-x-10">
        {/* Profile Section */}
        <div
          className="rounded-xl p-8 text-white"
          style={{
            backgroundColor: "#172e59",
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 10px, transparent 10px, transparent 20px)",
          }}
        >
          <div className="flex flex-col items-center">
            <img
              src={mentorDetails?.profile_imageURL}
              alt={mentorDetails?.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4"
            />
            <h1 className="text-2xl font-bold mb-2 text-center">
              {mentorDetails?.name}
            </h1>
            <p className="text-sm text-gray-300 mb-4 text-center">
              {mentorDetails?.bio}
            </p>
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={() => setIsDialogOpen(true)}
              >
                Book 1:1 Session
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div>
            <h2 className="text-xl font-semibold mb-4">About Mentor</h2>
            <p className="text-gray-700">{mentorDetails?.desc}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {mentorDetails?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white text-black rounded-lg py-10">
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#172e59] text-white rounded-xl p-4 space-y-5 mb-5">
                  <div className="flex gap-x-2 items-center">
                    <span>
                      <GoArrowLeft />
                    </span>
                    <span>{mentorDetails?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-2">
                      Book 1:1 Session
                    </h2>
                    <img
                      className="w-24 h-24 rounded-full"
                      src={mentorDetails.profile_imageURL}
                      alt={mentorDetails?.name}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-3/6 flex items-center">
                    <div className="flex justify-center items-center gap-x-1 border rounded-full p-2 bg-gray-100">
                      <span>
                        <MdCurrencyRupee />
                      </span>
                      199
                    </div>
                  </div>
                  <div className="w-3/6 flex items-center justify-end">
                    <div className="flex justify-center items-center gap-x-1">
                      <span>
                        <MdTimer />
                      </span>
                      15 mins meeting
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <p>
                    Prepare for your upcoming interview with me! I will assist
                    you with tips to get yourself ahead before even starting. -
                    How to answer questions - How to manage time during the
                    interview. I will share my LinkedIn interview experience
                    with you!
                  </p>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium mb-2 font-bold">
                      When should we meet?
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full border rounded-md px-3 py-2"
                      value={formData.date}
                      onChange={handleDateChange}
                    />
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 text-white bg-black rounded-md hover:bg-blue-700"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-x-4 text-black border-b-2 pb-2">
                    <span onClick={handleBack} className="text-black">
                      {" "}
                      <GoArrowLeft />
                    </span>
                    <div className="flex gap-x-2 items-center">
                      <img
                        className="h-8  w-8 rounded-full"
                        src={mentorDetails?.profile_imageURL}
                        alt={mentorDetails?.name}
                      />
                      <span>{mentorDetails?.name}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold">Confirm Your Details</h2>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div></div>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <span>{formattedDate}</span>
                        <span>{formattedTime}</span>
                      </div>
                      <button className="p-2 border rounded-full text-white bg-black">
                        {" "}
                        Change
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className="px-4 py-2 text-white bg-black rounded-md hover:bg-blue-700"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleMentor;
