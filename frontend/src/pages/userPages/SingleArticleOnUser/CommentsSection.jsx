import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { replyOnComment } from "@/services/api";

const Comment = ({ comment, onReply, user, isLoading }) => {
  const [showReplies, setShowReplies] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleReplySubmit = () => {
    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    onReply(comment._id, replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className="border border-black rounded-lg mb-3 p-3">
      <div className="flex items-center gap-x-4">
        <Avatar>
          <AvatarImage
            src={
              comment.user?.profile_imageURL || "https://via.placeholder.com/40"
            }
          />
          <AvatarFallback>
            {comment.user?.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{comment.user?.name}</p>
          <p>{comment.desc}</p>
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="flex gap-x-4">
          <span
            className="text-sm cursor-pointer text-blue-500"
            onClick={() => setIsReplying(!isReplying)}
          >
            Reply
          </span>
          {comment.replies?.length > 0 && (
            <span
              className="text-sm cursor-pointer text-gray-500"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </span>
          )}
        </div>
      </div>

      {isReplying && (
        <div className="mt-4 flex items-start gap-x-4 ml-8">
          <Avatar>
            <AvatarImage
              src={user?.profile_imageURL || "https://via.placeholder.com/40"}
            />
            <AvatarFallback>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea
              className="w-full border rounded-lg p-2"
              placeholder={`Replying to ${comment.user?.name}`}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button
              className={`mt-2 px-4 py-2 bg-[#172e59] text-white rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleReplySubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {showReplies && comment.replies?.length > 0 && (
        <div className="ml-8 mt-4 space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply._id} className="border-l-2 border-gray-200 pl-4">
              <div className="flex items-center gap-x-4">
                <Avatar>
                  <AvatarImage
                    src={
                      reply.user?.profile_imageURL ||
                      "https://via.placeholder.com/40"
                    }
                  />
                  <AvatarFallback>
                    {reply.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{reply.user?.name}</p>
                  <p>{reply.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsSection = ({ articleDetails }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { mutate, isLoading } = useMutation(replyOnComment, {
    onSuccess: () => {
      toast.success("Reply added successfully!");
      queryClient.invalidateQueries("articleDetails");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add reply.");
    },
  });

  const handleReplyOnComment = (commentId, replyContent) => {
    console.log(commentId, replyContent);
    mutate({ commentId, replyContent });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {articleDetails?.comments?.length > 0 ? (
        articleDetails.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onReply={handleReplyOnComment}
            user={user}
            isLoading={isLoading}
          />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsSection;
