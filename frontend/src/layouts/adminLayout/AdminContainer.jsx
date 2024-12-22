import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminContainer = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex">
      <div
        className={`sticky top-0 h-screen bg-[#172e59] ${isSidebarCollapsed ? "py-5 px-2" : "p-5"} overflow-y-auto transition-all duration-300 ${
          isSidebarCollapsed ? "max-w-[80px]" : "max-w-[250px]"
        }`}
      >
        <AdminSidebar isCollapsed={isSidebarCollapsed} />
      </div>
      <div className="flex-1 border">
        <AdminHeader
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminContainer;
