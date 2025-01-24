import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { StudyMaterialProvider } from "./context/StudyMaterialContext";
import { ArticleProvider } from "./context/ArticleContext";
// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ArticleProvider>
        <StudyMaterialProvider>
          <App />
          <Toaster />
        </StudyMaterialProvider>
      </ArticleProvider>
    </AuthProvider>
  </QueryClientProvider>
);
