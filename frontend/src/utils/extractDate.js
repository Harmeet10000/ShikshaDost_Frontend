export const extractDate = (dateTimeString) => {
  // Create a Date object
  const dateObj = new Date(dateTimeString);
  console.log(dateObj);
  // Extract the date
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options); // e.g., January 29, 2025

  // Extract the time with AM/PM
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

  return { formattedDate, formattedTime };
};
