import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("authToken");

export const getSignedUrl = async (filename, contentType,routePath) => {
  try {
    const response = await axios.post(
        `http://localhost:8000/api/v1/${routePath}/getUploadS3URL`    ,
      { filename, contentType, destination: "blogs" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting signed URL:", error);
    throw error;
  }
};

export const replaceSpacesInPath = (path) => {
  return path.replace(/\s+/g, "+");
};
