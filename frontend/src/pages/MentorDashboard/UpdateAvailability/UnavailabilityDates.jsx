import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const UnavailabilityDates = () => {
  const { user } = useAuth();

  const [unavailability, setUnavailability] = useState([]);

  // Load unavailability from user when the component mounts
  useEffect(() => {
    if (user?.unavailability) {
      setUnavailability(user.unavailability);
    }
  }, [user]);

  // Handle slot removal
  const handleRemoveSlot = (dateId, slotId) => {
    setUnavailability(
      (prev) =>
        prev
          .map((date) => {
            if (date.id === dateId) {
              return {
                ...date,
                slots: date.slots.filter((slot) => slot.id !== slotId),
              };
            }
            return date;
          })
          .filter((date) => date.slots.length > 0) // Remove dates with no slots left
    );
  };

  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-bold">Unavailability Dates</h1>

      {unavailability.length > 0 ? (
        unavailability.map((date) => (
          <div key={date.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">
              {new Date(date.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <div className="space-y-2">
              {date.slots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm"
                >
                  <span className="text-gray-700">
                    {slot.start} - {slot.end}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveSlot(date.id, slot.id)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No unavailability dates available.</p>
      )}
    </div>
  );
};

export default UnavailabilityDates;
