import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import TableModule from "quill-table-ui";

import "quill-table-ui/dist/index.css"; // For table styling

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { Textarea } from "@/components/ui/textarea";

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
    Quill.register({
      "modules/table": TableModule,
    });

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            ["link", "image", "video", "formula"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["table", "table-row-above", "table-row-below", "table-column-left", "table-column-right", "table-delete-row", "table-delete-column", "table-delete"],
          ],
          handlers: {
            image: handleImageUpload,
          },
        },
        table: true, // Enable table module
      },
    });

    editorRef.current.__quill = quill;

    const cleanQuillContent = (htmlContent) => {
      return htmlContent
        .replace(/<p><br><\/p>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    quill.on("text-change", () => {
      const cleanedContent = cleanQuillContent(quill.root.innerHTML);
      setContent(cleanedContent);
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
        setCoverImage(coverUrl);
      } catch (error) {
        console.error("Error uploading cover image:", error);
      }
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const blogData = { ...data, content, cover_image: coverImage };
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
        className="create-blog-form flex flex-col gap-y-10 "
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
        <div className="form-group">
          <Textarea
            placeholder="Enter blog description"
            {...register("desc", { required: "Description is required" })}
            className={`textarea ${errors.desc ? "textarea-error" : ""}`}
          />
          {errors.desc && (
            <p className="error-message text-red-500 mt-1">
              {errors.desc.message}
            </p>
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
