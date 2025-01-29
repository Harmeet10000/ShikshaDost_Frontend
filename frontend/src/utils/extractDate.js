export const extractDate = (dateTimeString) => {
  const date = dateTimeString.split("T")[0];
  const dateObj = new Date(dateTimeString);
  // console.log(dateObj);
  // Extract the date
  const options = { year: "numeric", month: "long", day: "numeric" };
  
  const formattedDate = dateObj.toLocaleDateString("en-US", options); // e.g., January 29, 2025

  // Extract the time with AM/PM
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

  return { date, formattedDate, formattedTime };
};


export const addMinutes = (time, minutes) => {
  const [hours, rest] = time.split(":");
  const [minutesPart, period] = rest.split(" ");
  let date = new Date();
  date.setHours(period === "PM" ? parseInt(hours) + 12 : parseInt(hours), parseInt(minutesPart));
  date.setMinutes(date.getMinutes() + minutes);

  let hours12 = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  hours12 = hours12 === 0 ? 12 : hours12; // Handle midnight
  const newPeriod = date.getHours() >= 12 ? "PM" : "AM";
  const formattedTime = `${hours12}:${String(date.getMinutes()).padStart(2, "0")} ${newPeriod}`;
  return formattedTime;
};
