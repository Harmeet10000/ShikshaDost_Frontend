import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL; // Your API base URL from the .env file

export const signupUser = async (userData) => {
  // Define headers
  const headers = {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${yourToken}`,
  };

  const response = await axios.post(
    `${API_URL}/users/signup`,
    userData,
    { headers , withCredentials: true,},
    
  );
  return response.data;
};

export const loginUser = async (loginData) => {
    const response = await axios.post(`${API_URL}/users/login`, loginData, {
      withCredentials: true, // To include cookies for auth tokens
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

export const verifyEmail = async (token) => {
  const response = await axios.get(`${API_URL}/users/verify-email/${token}`);
  return response.data;
};
