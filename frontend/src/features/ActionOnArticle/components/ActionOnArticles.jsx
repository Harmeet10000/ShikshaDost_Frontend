import React, { useState } from "react";
import { BiComment, BiLike, BiShare, BiSave } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BsEmojiLaughingFill } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { handleLikeOnPost, handleShareOnPost } from "@/services/api";
import { useNavigate } from "react-router-dom";

const ActionOnArticles = ({ articleDetails, setArticleDetails }) => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("authToken");

  //handling comment on articles
  const handlePostComment = async () => {
    try {
      if (!user) {
        navigate("/register");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/api/v1/comments/${articleDetails?._id}`,
        { desc: comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const newComment = response.data.data.data;

        // Update query cache
        queryClient.setQueryData(
          ["articleDetails", articleDetails?._id],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              comments: [...(oldData.comments || []), newComment],
            };
          }
        );

        // Update the local state in SingleArticleOnUser
        setArticleDetails((prev) => ({
          ...prev,
          comments: [newComment, ...(prev.comments || [])],
        }));

        toast("Comment posted successfully");
      }
    } catch (error) {
      toast(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      setComment("");
    }
  };

  //mutation for like functionality
  const { mutate } = useMutation(handleLikeOnPost, {
    onSuccess: (data) => {
      console.log(data);
      if (data.action === "like") {
        setArticleDetails((prev) => ({
          ...prev,
          likes: prev.likes + 1,
        }));
        
      } else {
        setArticleDetails((prev) => ({
          ...prev,
          likes: prev.likes - 1,
        }));
      }

      toast.success(`blog ${data.action === "like"?"liked":"disliked"}`);
     
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to like post.");
    },
  });

  //mutation for share functaionality
  const mutation = useMutation(handleShareOnPost, {
    onSuccess: () => {
      setArticleDetails((prev) => ({
        ...prev,
        shares: prev.shares + 1,
      }));

      toast.success("Blog shared");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to share post.");
    },
  });

  // handling like on articles
  const handleLike = () => {
    if (!user) {
      navigate("/register");
      return;
    }
    mutate(articleDetails?._id);
  };

  //handling share on articles
  const handleShare = async () => {
    try {
      if (!user) {
        navigate("/register");
        return;
      }
      const articleLink = `${window.location.origin}/articles/${articleDetails?.slug}`;
      await navigator.clipboard.writeText(articleLink);
      mutation.mutate(articleDetails?._id);
      alert("Article share link copied!");
    } catch (error) {
      console.error("Failed to copy share link: ", error);
      toast.error("Failed to copy share link.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/blogs/save-blog/${articleDetails?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        updateUser({ savedBlogs: response.data.savedBlogs });
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-5 mb-5">
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-x-2 hover:bg-gray-300 p-2 hover:cursor-pointer hover:rounded-xl"
          onClick={handleLike}
        >
          <span>
            <BiLike />
          </span>{" "}
          Like
        </div>
        <div
          className="flex items-center gap-x-2 hover:bg-gray-300 p-2 hover:cursor-pointer hover:rounded-xl"
          onClick={() => setDisplayCommentInput(!displayCommentInput)}
        >
          <span>
            <BiComment />
          </span>{" "}
          Comment
        </div>
        <div
          className="flex items-center gap-x-2 hover:bg-gray-300 p-2 hover:cursor-pointer hover:rounded-xl"
          onClick={handleShare}
        >
          <span>
            <BiShare />
          </span>{" "}
          Share
        </div>
        <div
          className="flex items-center gap-x-2 hover:bg-gray-300 p-2 hover:cursor-pointer hover:rounded-xl"
          onClick={handleSave}
        >
          <span>
            <BiSave />
          </span>{" "}
          Save
        </div>
      </div>
      {displayCommentInput && (
        <div className="comment-input-section flex gap-x-4">
          <Avatar>
            <AvatarImage src={user?.profile_imageURL} />
            <AvatarFallback>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 border border-black rounded-xl">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-none"
            />
            <div className="flex justify-between items-center p-3">
              <BsEmojiLaughingFill />
              <button
                className="bg-[#172e59] p-1 text-white rounded-full"
                onClick={handlePostComment}
                disabled={loading}
              >
                {loading ? "Posting..." : "Comment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionOnArticles;
