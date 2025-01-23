import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStudyMaterial } from "@/context/StudyMaterialContext";

const AddStudyMaterial = () => {
  const [category, setCategory] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const token = Cookies.get("authToken");

  const BUCKET_NAME = "shikshadost-studymaterial";
  const REGION = "ap-south-1";

  const { fetchStudyMaterials } = useStudyMaterial(); 
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
        "http://localhost:8000/api/v1/material/getUploadS3URL",
        { filename, contentType, destination: "material" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting signed URL:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    console.log(selectedFile.name, selectedFile.type);
    try {
      setIsUploading(true);
      const { signedUrl, path } = await getSignedUrl(
        selectedFile.name,
        selectedFile.type
      );

      console.log(signedUrl);
      const sanitizedPath = replaceSpacesInPath(path);

      await axios.put(signedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      const S3url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${sanitizedPath}`;

      const materialData = {
        category,
        class: classLevel,
        subject,
        chapter,
        topicName: topic,
        S3url,
      };

      // console.log(materialData)
      const response = await axios.post(
        `http://localhost:8000/api/v1/material/addMaterial`,
        materialData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        toast("Material Added Successfully");
        await fetchStudyMaterials(); 
      }
      console.log(response);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Failed to Add Material. Please try again.");
    } finally {
      setIsUploading(false);
      setCategory("");
      setClassLevel("");
      setSubject("");
      setTopic("");
      setChapter("");
      setSelectedFile(null)
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Add Study Material</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jee">JEE</SelectItem>
                <SelectItem value="neet">NEET</SelectItem>
                <SelectItem value="cuet">CUET</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Class Level */}
          <div>
            <Label htmlFor="classLevel">Class Level</Label>
            <Select onValueChange={setClassLevel} value={classLevel}>
              <SelectTrigger id="classLevel">
                <SelectValue placeholder="Select Class Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select onValueChange={setSubject} value={subject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chapter */}
          <div>
            <Label htmlFor="chapter">Chapter</Label>
            <Input
              type="text"
              id="chapter"
              placeholder="Enter Chapter"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            />
          </div>

          {/* Topic */}
          <div>
            <Label htmlFor="topic">Topic</Label>
            <Textarea
              id="topic"
              placeholder="Enter Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* File Input */}
          <div>
            <Label htmlFor="file">Upload File</Label>
            <Input type="file" id="file" onChange={handleFileChange} />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStudyMaterial;
