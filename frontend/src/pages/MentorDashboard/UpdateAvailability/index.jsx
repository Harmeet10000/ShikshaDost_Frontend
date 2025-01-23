import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { updateAvailability } from "@/services/api";
import UnavailabilityDates from "./UnavailabilityDates";

const UpdateAvailability = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [unavailability, setUnavailability] = useState([]);

  const mentorId = user?._id;
  // console.log(user?.id);
  const mutation = useMutation((data) => updateAvailability(mentorId, data), {
    onSuccess: () => {
      alert("Availability updated successfully!");
      // Clear the form after successful update
      setSelectedDate(null);
      setStartTime("");
      setEndTime("");
      setUnavailability([]);
    },
    onError: (error) => {
      console.error("Error updating availability:", error.message);
      // alert("Failed to update availability. Please try again.");
    },
  });

  const handleAddTimeSlot = () => {
    if (selectedDate && startTime && endTime) {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      // Check if we already have this date in our array
      const existingDateIndex = unavailability.findIndex(
        (item) => item.date === formattedDate
      );

      if (existingDateIndex >= 0) {
        // Update existing date's slots
        setUnavailability((prev) => {
          const updated = [...prev];
          updated[existingDateIndex].slots.push({
            start: startTime,
            end: endTime,
          });
          return updated;
        });
      } else {
        // Add new date with slot
        setUnavailability((prev) => [
          ...prev,
          {
            date: formattedDate,
            slots: [
              {
                start: startTime,
                end: endTime,
              },
            ],
          },
        ]);
      }
      console.log(unavailability);
      // Clear time inputs but keep the date selected
      setStartTime("");
      setEndTime("");
    }
  };

  const handleRemoveSlot = (dateIndex, slotIndex) => {
    setUnavailability((prev) => {
      const updated = [...prev];
      updated[dateIndex].slots = updated[dateIndex].slots.filter(
        (_, idx) => idx !== slotIndex
      );

      // If no slots left for this date, remove the date entirely
      if (updated[dateIndex].slots.length === 0) {
        return updated.filter((_, idx) => idx !== dateIndex);
      }
      return updated;
    });
  };

  const handleUpdateAvailability = () => {
    if (unavailability.length > 0) {
      console.log(unavailability);
      mutation.mutate(unavailability);
    } else {
      alert("Please add at least one unavailable time slot before updating.");
    }
  };

  return (
    <div className="flex">
      <div className=" w-full md:w-3/6   min-h-screen flex flex-col ">
        <h1 className="text-2xl font-bold mb-6 ">Update Availability</h1>
        <div className="w-full max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Select Date and Time</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  placeholderText="Select a date"
                  className="p-2 border rounded w-full"
                  minDate={new Date()}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
                onClick={handleAddTimeSlot}
                disabled={!selectedDate || !startTime || !endTime}
              >
                Add Time Slot
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Selected Unavailable Times
            </h2>
            {unavailability.length > 0 ? (
              <div className="space-y-4">
                {unavailability.map((item, dateIndex) => (
                  <div key={dateIndex} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{item.date}</h3>
                    <div className="space-y-2">
                      {item.slots.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <span>
                            {slot.start} - {slot.end}
                          </span>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              handleRemoveSlot(dateIndex, slotIndex)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No unavailable times selected yet.
              </p>
            )}

            <button
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded shadow-md hover:bg-green-700 w-full"
              onClick={handleUpdateAvailability}
              disabled={mutation.isLoading || unavailability.length === 0}
            >
              {mutation.isLoading ? "Updating..." : "Update Availability"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/6">
        <UnavailabilityDates/>
      </div>
    </div>
  );
};

export default UpdateAvailability;
