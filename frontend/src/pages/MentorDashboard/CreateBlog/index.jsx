import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");
  const BUCKET_NAME = "shikshadost-studymaterial";
  const REGION = "ap-south-1";
  const token = Cookies.get("authToken");
  const getSignedUrl = async (filename, contentType) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/mentor/getUploadS3URL",
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  

  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const mutation = useMutation((newBlog) => {
    return axios.post("http://localhost:8000/api/v1/blogs", newBlog);
  });

  const onSubmit = (data) => {
    const blogData = { ...data, content };
    mutation.mutate(blogData);
  };

  return (
    <div className="create-blog-section">
      <h1 className="create-blog-title mb-2 font-bold text-xl">
        Create a Blog
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="create-blog-form space-y-5"
      >
        <div className="form-group">
          <Input
            type="text"
            placeholder="Enter blog title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>
        <div className="form-group h-[300px]">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Write your blog content here..."
            className="h-[250px] "
          />
        </div>
        <div className="form-actions">
          <Button type="submit" className="submit-button">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
