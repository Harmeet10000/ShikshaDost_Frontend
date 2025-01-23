import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create a context
const StudyMaterialContext = createContext();

// Provider component
export const StudyMaterialProvider = ({ children }) => {
  const [studyMaterials, setStudyMaterials] = useState([]); // State to store materials
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const token = Cookies.get("authToken");
  // Function to fetch study materials
  const fetchStudyMaterials = async () => {
    try {
      setLoading(true);
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
      
      setStudyMaterials(response.data.data.data); // Assuming the data is directly in the response
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch study materials");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  // Fetch materials when the component mounts
  useEffect(() => {
    fetchStudyMaterials();
  }, []);

  return (
    <StudyMaterialContext.Provider
      value={{ studyMaterials, loading, error, fetchStudyMaterials }}
    >
      {children}
    </StudyMaterialContext.Provider>
  );
};

// Custom hook to use the StudyMaterialContext
export const useStudyMaterial = () => {
  const context = useContext(StudyMaterialContext);
  if (!context) {
    throw new Error(
      "useStudyMaterial must be used within a StudyMaterialProvider"
    );
  }
  return context;
};

// Default export (optional)
export default StudyMaterialContext;
