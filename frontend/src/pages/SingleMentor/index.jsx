import React, { useState } from "react";

const SingleMentor = () => {
  // State for managing new replies
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Mock data for demonstration
  const mentor = {
    profile_image: "https://via.placeholder.com/150",
    name: "John Doe",
    bio: "An experienced software engineer specializing in web development and mentoring.",
    available: true,
    about:
      "I have over 10 years of experience in the tech industry, working on various projects and mentoring budding developers.",
    skills: ["JavaScript", "React", "Node.js", "GraphQL", "TypeScript"],
    reviews: [
      {
        id: 1,
        profile_image: "https://via.placeholder.com/50",
        name: "Jane Smith",
        feedback:
          "John is an excellent mentor. He explains concepts clearly and provides valuable insights.",
        stars: 5,
        date: "2024-01-01",
        replies: [
          {
            id: 101,
            profile_image: "https://via.placeholder.com/50",
            name: "Mike Johnson",
            feedback:
              "I totally agree! His React explanations were super helpful for me too.",
            date: "2024-01-02",
          },
          {
            id: 102,
            profile_image: "https://via.placeholder.com/50",
            name: "Jane Smith",
            feedback: "Thanks Mike! Yes, his teaching style is very effective.",
            date: "2024-01-03",
          },
        ],
      },
      {
        id: 2,
        profile_image: "https://via.placeholder.com/50",
        name: "Sam Wilson",
        feedback:
          "Great experience! John helped me understand advanced React concepts.",
        stars: 4,
        date: "2024-01-04",
        replies: [],
      },
    ],
  };

  // Handle submitting a new reply
  const handleReplySubmit = (reviewId) => {
    if (replyText.trim()) {
      // Here you would typically make an API call to save the reply
      console.log(`New reply to review ${reviewId}:`, replyText);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Profile Section */}
      <div
        className="rounded-xl p-8 text-white"
        style={{
          backgroundColor: "#172e59",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 10px, transparent 10px, transparent 20px)",
        }}
      >
        <div className="flex flex-col items-center">
          <img
            src={mentor.profile_image}
            alt={mentor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{mentor.name}</h1>
          <p className="text-sm text-gray-300 mb-4 text-center">{mentor.bio}</p>
          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                mentor.available ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {mentor.available ? "Available" : "Not Available"}
            </span>
            {mentor.available && (
              <button
                className="px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={() => alert("Book a session with the mentor!")}
              >
                Book a Session
              </button>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">About Mentor</h2>
        <p className="text-gray-700">{mentor.about}</p>
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {mentor.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews Section with Nested Comments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-6">
          {mentor.reviews.map((review) => (
            <div key={review.id} className="space-y-4">
              {/* Main Review */}
              <div className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg">
                <img
                  src={review.profile_image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{review.name}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {review.feedback}
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          i < review.stars ? "text-yellow-500" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <button
                    onClick={() => setReplyingTo(review.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Reply
                  </button>
                </div>
              </div>

              {/* Reply Input */}
              {replyingTo === review.id && (
                <div className="ml-16 p-4 bg-gray-50 rounded-lg">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-2 border rounded-md mb-2 text-sm"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReplySubmit(review.id)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {review.replies.length > 0 && (
                <div className="ml-16 space-y-3">
                  {review.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={reply.profile_image}
                        alt={reply.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {reply.name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {reply.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {reply.feedback}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMentor;
