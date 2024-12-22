import { Menu } from "lucide-react";
import React from "react";

const AdminHeader = ({ onToggleSidebar }) => {
  return (
    <div className="admin-header bg-white">
      <div className="container p-3">
        <button
          className="flex justify-center items-center"
          onClick={onToggleSidebar}
        >
          <span className="text-lg">
            <Menu />
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
