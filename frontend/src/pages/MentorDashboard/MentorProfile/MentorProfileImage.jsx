import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
const MentorProfileImage = () => {
  const { user ,updateUser} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const BUCKET_NAME = "shikshadost-studymaterial";
  const REGION = "ap-south-1";
  const mentorId = user?._id;
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const replaceSpacesInPath = (path) => {
    return path.replace(/\s+/g, "+");
  };

  const getSignedUrl = async (filename, contentType) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/mentor/getUploadS3URL",
        { filename, contentType, destination: "mentors" },
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
  const handleUpload = async () => {
    if (!selectedFile) return;
    // console.log(selectedFile.name, selectedFile.type);
    try {
      setIsUploading(true);
      const { signedUrl, path } = await getSignedUrl(
        selectedFile.name,
        selectedFile.type
      );
      const sanitizedPath = replaceSpacesInPath(path);
      // console.log(signedUrl);
      await axios.put(signedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      const s3Url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${sanitizedPath}`;

      const response = await axios.patch(
        `http://localhost:8000/api/v1/mentor/${mentorId}`,
        { profile_imageURL: s3Url },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if(response.status === 200){
        updateUser({profile_imageURL:response?.data.data.data.profile_imageURL})
      }
      
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      setIsOpen(false);
    }
  };
  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
        <img
          src={user?.profile_imageURL}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-0 right-0 rounded-full p-2"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
          </DialogHeader>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4"
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorProfileImage;
