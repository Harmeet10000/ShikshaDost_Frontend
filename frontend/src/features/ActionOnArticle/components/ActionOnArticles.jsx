import React, { useState } from "react";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BsEmojiDizzy, BsEmojiLaughingFill } from "react-icons/bs";
import { MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastTitle } from "@radix-ui/react-toast";
import { toast } from "sonner";
import { useArticles } from "@/context/ArticleContext";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const ActionOnArticles = ({ articleDetails, setArticleDetails }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("authToken");

  const handlePostComment = async () => {
    try {
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

  return (
    <div className="space-y-5 mb-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2 hover:bg-gray-300 p-2 hover:cursor-pointer hover:rounded-xl">
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
        <div className="flex items-center gap-x-2 hover:bg-gray-300 p-2 hover:cursor-pointer hover:rounded-xl">
          <span>
            <BiShare />
          </span>{" "}
          Share
        </div>
      </div>
      {displayCommentInput && (
        <div className="comment-input-section flex gap-x-4">
          <Avatar>
            <AvatarImage src={user?.profile_imageURL} />
            <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
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
