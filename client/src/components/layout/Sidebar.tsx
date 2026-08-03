import {
  LayoutDashboard,
  Users,
  FlaskConical,
  FileText,
  Settings,
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
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
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
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-white">

      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Embrogen
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg p-3 transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-red-500 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;