import React from "react";
import company_logo from "../../assets/company_logo.png";
import { MdArticle, MdSpaceDashboard } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { PiNotebookFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ isCollapsed }) => {
  return (
    <section
      className={`admin-sidebar-section text-white space-y-5 transition-all duration-300 ${
        isCollapsed ? "space-y-3" : "space-y-5"
      }`}
    >
      <div className="flex justify-center items-center gap-x-5">
        <img
          className={`rounded-full transition-all duration-300 ${
            isCollapsed ? "w-8 h-8" : "w-24 h-24"
          }`}
          src={company_logo}
          alt="Shiksha Dost logo"
        />
        {!isCollapsed && <h1 className="font-bold text-2xl">AdminHub</h1>}
      </div>
      <div className="flex flex-col gap-y-2">
        {[
          { to: "/admin/dashboard", icon: <MdSpaceDashboard />, label: "Dashboard" },
          { to: "/admin/mentors", icon: <IoPeopleSharp />, label: "Mentors" },
          { to: "/admin/study-material", icon: <ImBooks />, label: "Study Material" },
          { to: "/admin/articles", icon: <MdArticle />, label: "Articles" },
          { to: "/admin/daily-practice", icon: <PiNotebookFill />, label: "Daily Practice" },
          { to: "/admin/mbbs-abroad", icon: <FaUserDoctor />, label: "MBBS Abroad" },
          { to: "/admin/complaints", icon: <BsFillQuestionSquareFill />, label: "Complaints" },
          { to: "/admin/settings", icon: <RiAdminFill />, label: "Admin Settings" },
        ].map((item, index) => (
          <div className="py-2" key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center ${
                  isCollapsed ? "justify-center" : "gap-x-3"
                } text-lg p-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black"
                    : "hover:bg-green-500 hover:translate-x-2"
                }`
              }
            >
              <span>{item.icon}</span>
              {!isCollapsed && item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminSidebar;
