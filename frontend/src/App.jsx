import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContainer from "./layouts/userLayout/UserContainer";

import RegisterPage from "./pages/RegisterPage";
import AdminContainer from "./layouts/adminLayout/AdminContainer";

import MBBSAbroadSection from "./pages/Admin/MBBSAbroadSection";
import EmailVerificationPage from "./pages/EmailVerificationPage";

import ProtectedRoute from "@/features/RoutesAuthentication/ProtectedRoute";
import { motion, useScroll, useSpring } from "framer-motion";

import AdminDashboard from "./pages/Admin/Statistics";
import MentorsSection from "./pages/Admin/MentorsSection";
import StudyMaterialSection from "./pages/Admin/StudyMaterialManagement";
import DailyPracticeSection from "./pages/Admin/DppManagement";
import AuthRedirect from "./features/RoutesAuthentication/AuthRedirect";

import SingleMentor from "./pages/userPages/SingleMentor";
import Home from "./pages/userPages/Home";
import Mentors from "./pages/userPages/Mentors";
import ArticlesPage from "./pages/userPages/ArticlesPage";
import MentorDashboard from "./pages/MentorDashboard/Dashboard";
import MentorContainer from "./layouts/mentorsLayout/MentorContainer";
import MentorProfile from "./pages/MentorDashboard/MentorProfile";
import Mentees from "./pages/MentorDashboard/Mentees";
import UpdateAvailability from "./pages/MentorDashboard/UpdateAvailability";
import CreateBlog from "./pages/MentorDashboard/CreateBlog";
import PublishedArticles from "./pages/MentorDashboard/PublishedArticles";
import SingleArticle from "./pages/MentorDashboard/SingleArticle";
import ManageArticles from "./pages/Admin/ArticlesManagement";
import SingleArticleOnUser from "./pages/userPages/SingleArticleOnUser";
import StudentProfile from "./pages/userPages/UserProfile";
import Success from "./pages/Success";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <BrowserRouter>
        <motion.div
          className="fixed top-0 left-0 right-0 h-[4px] bg-[#0B545D] origin-left z-[9999]"
          style={{ scaleX }}
        />

        {/* User Routes */}
        <Routes>
          {/* <Route path="/psf" element={<Success />} /> */}

          <Route
            path="/"
            element={<AuthRedirect element={<UserContainer />} />}
          >
            <Route index element={<AuthRedirect element={<Home />} />} />
            <Route
              path="mentors"
              element={<AuthRedirect element={<Mentors />} />}
            />
            <Route
              path="mentors/:mentorId"
              element={<AuthRedirect element={<SingleMentor />} />}
            />
            <Route
              path="articles"
              element={<AuthRedirect element={<ArticlesPage />} />}
            />
            <Route
              path="articles/:slug"
              element={<AuthRedirect element={<SingleArticleOnUser />} />}
            />
            <Route
              path="register"
              element={<AuthRedirect element={<RegisterPage />} />}
            />
            <Route
              path="my-profile"
              element={<AuthRedirect element={<StudentProfile />} />}
            />
          </Route>

          {/* Admin Routes with ProtectedRoute */}
          <Route path="/admin" element={<AdminContainer />}>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute
                  element={<AdminDashboard />}
                  roles={["admin"]}
                />
              }
            />
            <Route
              path="mentors"
              element={
                <ProtectedRoute
                  element={<MentorsSection />}
                  roles={["admin"]}
                />
              }
            />
            <Route
              path="study-material"
              element={
                <ProtectedRoute
                  element={<StudyMaterialSection />}
                  roles={["admin"]}
                />
              }
            />
            <Route
              path="articles"
              element={
                <ProtectedRoute
                  element={<ManageArticles />}
                  roles={["admin"]}
                />
              }
            />
            <Route
              path="daily-practice"
              element={
                <ProtectedRoute
                  element={<DailyPracticeSection />}
                  roles={["admin"]}
                />
              }
            />
            <Route
              path="mbbs-abroad"
              element={
                <ProtectedRoute
                  element={<MBBSAbroadSection />}
                  roles={["admin"]}
                />
              }
            />
          </Route>

          {/* Mentor Routes with ProtectedRoute */}
          <Route path="/mentor" element={<MentorContainer />}>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute
                  element={<MentorDashboard />}
                  roles={["mentor"]}
                />
              }
            />
            <Route
              path="mentor-profile"
              element={
                <ProtectedRoute
                  element={<MentorProfile />}
                  roles={["mentor"]}
                />
              }
            />
            <Route
              path="mentees"
              element={
                <ProtectedRoute element={<Mentees />} roles={["mentor"]} />
              }
            />
            <Route
              path="update-availability"
              element={
                <ProtectedRoute
                  element={<UpdateAvailability />}
                  roles={["mentor"]}
                />
              }
            />
            <Route
              path="create-blog"
              element={
                <ProtectedRoute element={<CreateBlog />} roles={["mentor"]} />
              }
            />
            <Route
              path="published-articles"
              element={
                <ProtectedRoute
                  element={<PublishedArticles />}
                  roles={["mentor"]}
                />
              }
            />
            <Route
              path="published-articles/:slug"
              element={
                <ProtectedRoute
                  element={<SingleArticle />}
                  roles={["mentor"]}
                />
              }
            />
          </Route>
          {/* Email Verification Route */}
          <Route
            path="/verify-email/:token"
            element={<EmailVerificationPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
