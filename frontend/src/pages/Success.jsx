import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id"); // ✅ Extracts payment_id

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard"); // ✅ Change this to your desired route
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Payment Successful!
        </h2>
        {paymentId ? (
          <p className="text-gray-600 mt-2">
            Payment ID:{" "}
            <span className="font-semibold text-gray-900">{paymentId}</span>
          </p>
        ) : (
          <p className="text-red-500 mt-2">Payment ID not found!</p>
        )}
        <p className="text-gray-500 mt-2">Redirecting you shortly...</p>
      </div>
    </div>
  );
};

export default Success;
