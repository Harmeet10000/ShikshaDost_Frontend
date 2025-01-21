import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL; // Your API base URL from the .env file

export const signupUser = async (userData) => {
  // Define headers
  const headers = {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${yourToken}`,
  };

  const response = await axios.post(`${API_URL}/users/signup`, userData, {
    headers,
    withCredentials: true,
  });
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/auth/login`, loginData, {
    withCredentials: true, // To include cookies for auth tokens
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await axios.get(`${API_URL}/auth/verify-email/${token}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createMentor = async (mentorData) => {
  console.log("mentor data", mentorData);
  console.log("api url", API_URL);
  const response = await axios.post(
    `${API_URL}/auth/signupMentor`,
    mentorData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials if needed
    }
  );
  console.log(response);
  return response.data;
};

export const loginMentor = async (MentorLoginCredentials) => {
  const response = await axios.post(
    `${API_URL}/auth/loginMentor`,
    MentorLoginCredentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials if needed
    }
  );
  return response.data;
};

export const getAllMentorsListInAdmin = async () => {
  const response = await axios.get(`${API_URL}/mentor/getAllMentor`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials if needed
  });
  return response.data.data.mentors;
};
