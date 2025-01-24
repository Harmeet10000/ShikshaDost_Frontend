import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const [coverImage, setCoverImage] = useState("");
  const BUCKET_NAME = "shikshadost-studymaterial";
  const REGION = "ap-south-1";
  const token = Cookies.get("authToken");

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"], // remove formatting button
          ],
          handlers: {
            image: handleImageUpload,
          },
        },
      },
    });

    editorRef.current.__quill = quill;

    quill.on("text-change", () => {
      setContent(quill.root.innerHTML);
    });

    return () => {
      quill.off("text-change");
    };
  }, []);

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

  const replaceSpacesInPath = (path) => {
    return path.replace(/\s+/g, "+");
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const { signedUrl, path, fileUrl } = await getSignedUrl(
            file.name,
            file.type
          );

          const sanitizedPath = replaceSpacesInPath(path);

          await axios.put(signedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
          const S3url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${sanitizedPath}`;
          // console.log("s3", S3url, "file", fileUrl);
          const imageUrl = S3url;
          const quill = editorRef.current.__quill;

          if (quill) {
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, "image", imageUrl);
            }
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  };

  const handleCoverImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const { signedUrl, path, fileUrl } = await getSignedUrl(
          file.name,
          file.type
        );
       
        const sanitizedPath = replaceSpacesInPath(path);

        await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        const coverUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${sanitizedPath}`;
        console.log(coverUrl)
        setCoverImage(coverUrl)
        console.log(coverImage);
      } catch (error) {
        console.error("Error uploading cover image:", error);
      }
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(content);
      const blogData = { ...data, content,cover_image:coverImage };
      console.log(blogData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/blogs/createBlog",
        blogData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsSubmitting(false);
      reset();
      setContent("");
    }
  };

  return (
    <div className="create-blog-section">
      <h1 className="create-blog-title mb-2 font-bold text-xl">
        Create a Blog
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="create-blog-form  flex flex-col gap-y-10 "
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
        <div className="form-group">
          <Input
            type="file"
            accept="image/*"
            onChange={handleCoverImageUpload}
          />
          {coverImage && (
            <p className="text-green-500">Cover image uploaded successfully!</p>
          )}
        </div>
        <div className="form-group h-[300px] mb-10">
          <div ref={editorRef} className="quill-editor h-full" />
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
