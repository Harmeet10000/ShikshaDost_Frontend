import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminContainer = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-[#172e59] transition-all duration-300 overflow-y-auto ${
          isSidebarCollapsed ? "max-w-[80px] py-5 px-2" : "max-w-[250px] p-5"
        }`}
        aria-expanded={!isSidebarCollapsed}
      >
        <AdminSidebar isCollapsed={isSidebarCollapsed} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminContainer;
