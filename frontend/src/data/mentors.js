import mentor1 from "../assets/mentor1.jpg";
import mentor2 from "../assets/mentor2.jpg";
import mentor3 from "../assets/mentor3.jpg";

export const mentors = [
  {
    id: 1,
    name: "Anant Singh",
    profile_image: mentor1,
    bio: "A seasoned educator specializing in engineering and technology subjects.",
    about_us:
      "I am a dedicated mentor with over 10 years of experience helping students achieve their academic and career goals. My focus is on providing personalized guidance to ensure success.",
    skills: ["JavaScript", "React", "Node.js", "Career Guidance"],
    categories: ["JEE", "NEET", "CUET"],
    reviews: [
      { stars: 5, feedback: "Anant is an excellent mentor! Highly recommended." },
      { stars: 4, feedback: "Great sessions, very informative." },
    ],
  },
  {
    id: 2,
    name: "Ritika Sharma",
    profile_image:mentor2,
    bio: "An experienced mentor passionate about helping students excel in medical studies.",
    about_us:
      "With a background in biology and healthcare, I aim to simplify complex topics and provide tailored support to my mentees.",
    skills: ["Biology", "NEET Preparation", "Health Sciences"],
    categories: ["JEE", "NEET", "CUET"],
    reviews: [
      { stars: 5, feedback: "Helped me immensely in NEET preparation." },
      { stars: 5, feedback: "Ritika's tips were a game changer for me!" },
    ],
  },
  {
    id: 3,
    name: "Vikram Raj",
    profile_image: mentor3,
    bio: "A professional with expertise in competitive exams and skill development.",
    about_us:
      "I have mentored hundreds of students for competitive exams and career readiness. I focus on strategic planning and effective learning methods.",
    skills: ["Quantitative Aptitude", "Logical Reasoning", "Interview Preparation"],
    categories: ["JEE", "NEET", "CUET"],
    reviews: [
      { stars: 4, feedback: "Great mentor with excellent strategies." },
      { stars: 3, feedback: "Could focus more on real-world examples." },
    ],
  },
  {
    id: 4,
    name: "Sanya Mehra",
    profile_image:mentor1,
    bio: "Creative writing and communication skills mentor.",
    about_us:
      "As a mentor, I inspire students to express themselves effectively through writing and communication, focusing on storytelling and presentation skills.",
    skills: ["Creative Writing", "Public Speaking", "Content Development"],
    categories: ["JEE", "NEET", "CUET"],
    reviews: [
      { stars: 5, feedback: "Incredible mentor for improving writing skills." },
      { stars: 4, feedback: "Sanya is very encouraging and insightful." },
    ],
  },
];
