import ShimmerButton from "@/components/ui/shimmer-button";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import React from "react";

const AdminHeader = ({ onToggleSidebar }) => {
  const { logout } = useAuth();
  return (
    <div className="admin-header bg-white">
      <div className="container p-3 flex justify-between items-center shadow-lg">
        <button
          className="flex justify-center items-center"
          onClick={onToggleSidebar}
        >
          <span className="text-lg">
            <Menu />
          </span>
        </button>
        <ShimmerButton className="bg-black text-white" onClick={logout}>
          Log Out
        </ShimmerButton>
      </div>
    </div>
  );
};

export default AdminHeader;
