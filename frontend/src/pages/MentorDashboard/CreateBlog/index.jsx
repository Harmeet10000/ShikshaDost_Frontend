import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const CreateBlog = () => {s
  const token = Cookies.get("authToken");
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const wrapperRef = useRef(null);

  const BUCKET_NAME = "shikshadost-studymaterial";
  const REGION = "ap-south-1";

  // Add styles to ensure toolbar visibility
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ql-toolbar {
        position: sticky !important;
        top: 0;
        z-index: 1;
        background: white;
      }
      .ql-container {
        height: 400px !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Focus the editor when the component mounts
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.focus();
    }
  }, []);

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const replaceSpacesInPath = (path) => {
    return path.replace(/\s+/g, "+");
  };

  const getSignedUrl = async (filename, contentType) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/blogs/getUploadS3URL",
        { filename, contentType },
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

  const handleImageUpload = async () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (file) {
          try {
            const { signedUrl, path } = await getSignedUrl(file.name, file.type);
            const sanitizedPath = replaceSpacesInPath(path);

            await axios.put(signedUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
            });

            const s3Url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${sanitizedPath}`;
            
            // Insert the image into the editor
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range ? range.index : 0, 'image', s3Url);
            
            resolve(s3Url);
          } catch (error) {
            console.error("Image upload failed:", error);
            reject(error);
          }
        }
      };
    });
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ align: [] }],
        ["link", "image"],
        ["blockquote", "code-block"],
        ["clean"],
      ],
      handlers: {
        image: async () => {
          try {
            await handleImageUpload();
          } catch (error) {
            console.error("Image handler error:", error);
          }
        },
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      content: editorContent,
    };

    console.log(blogData);
    navigate("/blogs");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter blog title"
          />
        </div>

        <div ref={wrapperRef} className="h-[500px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <div className="h-full">
            <ReactQuill
              ref={quillRef}
              value={editorContent}
              onChange={handleEditorChange}
              modules={modules}
              className="h-[400px] border rounded-md"
              theme="snow"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

