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

export const verifyEmail = async (verifyToken) => {
  console.log(verifyToken);
  const response = await axios.get(
    `${API_URL}/auth/verify-email/${verifyToken}`,
    {
      withCredentials: true,
    }
  );
  console.log(response);
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
  console.log(response.data.data.unavailability);
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
  // console.log(data);
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
  // console.log(response);
  return response?.data.data.data;
};

export const fetchAllArticles = async () => {
  const response = await axios.get(`${API_URL}/blogs/getAllBlogs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  // console.log(response.data);
  return response.data.data.data; // Ensure the API returns the correct structure
};

export const replyOnComment = async ({ commentId, replyContent }) => {
  const response = await axios.post(
    `${API_URL}/comments/reply/${commentId}`,
    { desc: replyContent },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adjust according to your token logic
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const handleLikeOnPost = async (blogId) => {
  const response = await axios.post(
    `${API_URL}/blogs/like/${blogId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adjust according to your token logic
      },
    }
  );
  console.log(response);
  return response.data;
};

export const handleShareOnPost = async (blogId) => {
  const response = await axios.post(
    `${API_URL}/blogs/share/${blogId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adjust according to your token logic
      },
    }
  );
  console.log(response);
  return response.data.data.blog;
};

export const updateStudentProfileImage = async ({ userId, profile_image }) => {
  const response = await axios.patch(
    `${API_URL}/users/updateProfileImage/${userId}`,
    { profile_imageURL: profile_image },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adjust according to your token logic
      },
    }
  );

  return response.data.data;
};

export const getSingleMentorDetails = async (mentorId) => {
  const response = await axios.get(
    `${API_URL}/mentor/getMentorDetails/${mentorId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adjust according to your token logic
      },
    }
  );
  // console.log(response.data);
  return response.data.data.data;
};

export const fetchArticles = async () => {
  
  const response = await axios.get(
    "http://localhost:8000/api/v1/blogs/getAllBlogs",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  
  return response.data.data.data; // Ensure the API response matches your structure
};

export const fetchLatestArticles = async () => {
  
  const response = await axios.get(
    "http://localhost:8000/api/v1/blogs/getLatestBlogs",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  
  return response.data.data; // Ensure the API response matches your structure
};

export const fetchProminentArticles = async () => {
  
  const response = await axios.get(
    "http://localhost:8000/api/v1/blogs/getProminentBlogs",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log(response);
  
  return response.data.data; // Ensure the API response matches your structure
};

export const fetchStudyMaterials = async () => {
  const storedStudyMaterials = localStorage.getItem("study-material");
  if (storedStudyMaterials) {
    return JSON.parse(storedStudyMaterials);
  }
  const response = await axios.get(
    "http://localhost:8000/api/v1/material/getMaterial",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  console.log(response);
  localStorage.setItem(
    "study-material",
    JSON.stringify(response.data.data.data)
  );

  // setStudyMaterials(response.data.data.data); // Assuming the data is directly in the response
  return response.data.data.data;
};


export const fetchUserMentorships = async () => {
  
  const response = await axios.get(
    "http://localhost:8000/api/v1/users/get",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  // console.log(response);
  
  return response.data.data.data; // Ensure the API response matches your structure
};