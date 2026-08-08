import {
  LayoutDashboard,
  Users,
  FlaskConical,
  FileText,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import useAuthStore from "@/store/authStore";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Patients",
    icon: Users,
    path: "/admin/patients",
  },
  {
    title: "Tests",
    icon: FlaskConical,
    path: "/admin/tests",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/admin/reports",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-5 top-5 flex h-[calc(100vh-40px)] w-72 flex-col rounded-3xl border border-slate-200 bg-white shadow-xl">

      <div className="border-b border-slate-200 px-7  py-7 bg-[#6C2E87] rounded-t-3xl">

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          EMBROGEN
        </h1>

        <p className="mt-1 text-sm text-slate-300">
          Embryological Services
        </p>

      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${isActive
                  ? "bg-[#6C2E87] text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={22} strokeWidth={2.2} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
      <p className="mb-4 text-center text-xs text-slate-400">
        Version 1.0.0
      </p>
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;