import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_BASE_URL; // Your API base URL from the .env file
const token = Cookies.get("authToken");

export const signupUser = async (userData) => {
  // Define headers
  console.log(userData);

  const response = await axios.post(`${API_URL}/auth/signup`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Include credentials if needed
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
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Include credentials if needed
  });
  console.log(response.data.data.data);
  return response.data.data.data;
};

export const updateAvailability = async (mentorId, unavailability) => {
  console.log(unavailability); // Log the payload for debugging
  const response = await axios.patch(
    `${API_URL}/mentor/unavailability/${mentorId}`,
    { unavailability }, // Send unavailability directly
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure token is fetched properly
      },
      withCredentials: true,
    }
  );

  return response.data.data.unavailability;
};

export const updateMentorDescription = async ({ description, mentorId }) => {
  console.log(description);
  const response = await axios.patch(
    `${API_URL}/mentor/${mentorId}`,
    { description },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return response.data.data;
};

export const updateProfile = async ({ name, bio, mentorId }) => {
  const response = await axios.patch(
    `${API_URL}/mentor/${mentorId}`,
    { name, bio },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return response.data.data;
};

export const updateMentorSkills = async ({ mentorId, skills }) => {
  const response = await axios.patch(
    `${API_URL}/mentor/${mentorId}`,
    { skills },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data.data;
};

export const fetchMentorBlogs = async (mentorId) => {
  const { data } = await axios.get(
    `${API_URL}/blogs/getMentorBlogs/${mentorId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  console.log(data);
  return data?.data.data;
};

export const fetchArticleDetails = async (slug) => {
  const response = await axios.get(`${API_URL}/blogs/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response);
  return response?.data.data.data;
};
