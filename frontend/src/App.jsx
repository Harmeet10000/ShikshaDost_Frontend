import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContainer from "./layouts/userLayout/UserContainer";
import Home from "./pages/Home";
import Mentors from "./pages/Mentors";
import RegisterPage from "./pages/RegisterPage";
import AdminContainer from "./layouts/adminLayout/AdminContainer";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MentorsSection from "./pages/Admin/MentorsSection";
import StudyMaterialSection from "./pages/Admin/StudyMaterialSection";
import DailyPracticeSection from "./pages/Admin/DailyPracticeSection";
import MBBSAbroadSection from "./pages/Admin/MBBSAbroadSection";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuth } from "@/context/AuthContext"; // Assuming your context provides user data
import ProtectedRoute from "./features/ProtectedRoute/components/ProtectedRoute";
import { motion, useScroll, useSpring } from "framer-motion";

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

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserContainer />}>
            <Route index element={<Home />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="register" element={<RegisterPage />} />
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

          {/* Email Verification Route */}
          <Route path="/verify-email/:token" element={<EmailVerificationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
