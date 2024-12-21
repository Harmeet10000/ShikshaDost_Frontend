import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContainer from "./layouts/userLayout/UserContainer";
import Home from "./pages/Home";
import Mentors from "./pages/Mentors";
import { motion, useScroll, useSpring } from "framer-motion";

import RegisterPage from "./pages/RegisterPage";

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
          <Route path="/" element={<UserContainer />}>
            <Route index element={<Home />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
