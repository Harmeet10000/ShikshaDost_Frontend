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
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoArrowLeft } from "react-icons/go";
import { MdCurrencyRupee, MdTimer } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { addMinutes, extractDate } from "@/utils/extractDate";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BiRupee } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";

//code-splitting
const ProfileIntro = React.lazy(() => import("./ProfileIntro"));
const ProfileOtherDetails = React.lazy(() => import("./ProfileOtherDetails"));
const MentorReviews = React.lazy(() => import("./MentorReviews"));

const SingleMentor = () => {
  const {user} = useAuth();
  const { mentorId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: "" });
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [date, setDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [availableMessage, setAvailableMessage] = useState("");
  const token = Cookies.get("authToken");
  console.log(token);
  const mentorshipCharges = 100;
  const platformCharges = 20;
  const total = mentorshipCharges + platformCharges;

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

  const handleDateChange = async (e) => {
    setFormData({ ...formData, date: e.target.value });
    const { date, formattedDate, formattedTime } = extractDate(formData.date);

    setDate(date);
    setFormattedDate(formattedDate);
    setFormattedTime(formattedTime);
    setNewTime(addMinutes(formattedTime, 15));
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/mentor/checkUnavailability/${mentorId}?date=${date}&slot=${formattedTime}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAvailableMessage(response.data.data.message);
      }
    } catch (error) {}
  };

  const handleContinue = () => {
    console.log(date, formattedDate, formattedTime);
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handlePayment = async () => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:8000/api/v1/payment/getkey", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(key);
      const {
        data: { order },
      } = await axios.post(
        "http://localhost:8000/api/v1/payment/checkout",
        { amount: 100 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(order);
      const response = await axios.post(
        `http://localhost:8000/api/v1/mentorship/create`,
        {
          date,
          slot: formattedTime,
          time: "15 min",
          mentorId,
          razorpay_order_id: order.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "6 Pack Programmer",
        description: "Tutorial of RazorPay",
        image: "",
        order_id: order.id,
        callback_url: "http://localhost:8000/api/v1/users/paymentverification",
        prefill: {
          name: user.name || "", // Prefill user's name
          email: user.email || "", // Prefill user's email
          contact: user.contact || "", // Prefill user's contact
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="px-10  flex py-10 gap-x-10">
        {/* Profile Section */}
        <div
          className="rounded-xl p-8 text-white h-[300px]"
          style={{
            backgroundColor: "#172e59",
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 10px, transparent 10px, transparent 20px)",
          }}
        >
          <React.Suspense
            fallback={
              <div className="flex flex-col gap-y-4 justify-center items-center">
                <Skeleton className="w-24 h-24 rounded-full bg-gray-100" />
                <Skeleton className="w-48 h-2 rounded-full bg-gray-100" />
                <Skeleton className="w-48 h-2 rounded-full bg-gray-100" />
              </div>
            }
          >
            <ProfileIntro
              mentorDetails={mentorDetails}
              setIsDialogOpen={setIsDialogOpen}
            />
          </React.Suspense>
        </div>

        <div className="flex-1 space-y-5">
          <React.Suspense
            fallback={
              <div className="space-y-5">
                <div className="space-y-3">
                  <Skeleton className="w-16 h-4 bg-gray-100 rounded-lg" />
                  <Skeleton className="w-64 h-16 bg-gray-100 rounded-lg" />
                </div>

                <div className="space-y-3">
                  <Skeleton className="w-8 h-2 bg-gray-100 rounded-lg" />
                  <div className="flex flex-wrap gap-x-2">
                    <Skeleton className="w-16 h-4 bg-gray-100 rounded-lg" />
                    <Skeleton className="w-16 h-4 bg-gray-100 rounded-lg" />
                  </div>
                </div>
              </div>
            }
          >
            <ProfileOtherDetails mentorDetails={mentorDetails} />
          </React.Suspense>
          <React.Suspense
            fallback={
              <div>
                <h1>Reviews</h1>
                <div>
                  <div>
                    <Skeleton className="w-64 h-64 bg-gray-100 rounded-lg" />
                  </div>
                  <div>
                    <Skeleton className="w-64 h-64 bg-gray-100 rounded-lg" />
                  </div>
                </div>
              </div>
            }
          >
            <MentorReviews />
          </React.Suspense>
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
                z
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
                    <p>{availableMessage}</p>
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
                  <div className="flex items-center gap-x-4 text-white bg-[#172e59] rounded-lg p-2">
                    <span onClick={handleBack} className="text-white">
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
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold">{formattedDate}</span>
                        <span>
                          {formattedTime}-{newTime}
                        </span>
                      </div>
                      <button
                        className="p-2 border rounded-full text-white bg-black"
                        onClick={() => setStep(step - 1)}
                      >
                        {" "}
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="order-summary max-w-md mx-auto mt-10">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Order Summary</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Order Details"
                      >
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>

                    {isOpen && (
                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                          <span>1:1 Mentorship Charges</span>
                          <span className="flex items-center gap-x-2">
                            <BiRupee /> {mentorshipCharges.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Charges</span>
                          <span className="flex items-center gap-x-2">
                            <BiRupee /> {platformCharges.toFixed(2)}
                          </span>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between font-bold text-base">
                          <span>Total</span>
                          <span className="flex items-center gap-x-2">
                            <BiRupee /> {total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center border rounded-lg shadow-lg p-3">
                    <button className="flex justify-center items-center fap-x-2">
                      <BiRupee /> {total.toFixed(2)}
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-black rounded-md hover:bg-blue-700"
                      onClick={handlePayment}
                    >
                      Confirm and Pay
                    </button>
                  </div>
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
