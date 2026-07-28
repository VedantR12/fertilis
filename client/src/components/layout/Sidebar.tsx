import { LayoutDashboard, Users, UserPlus, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-white min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          FertiLIS
        </h1>
      </div>

      <nav className="p-4 space-y-2">

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-gray-100">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-gray-100">
          <Users size={20} />
          Patients
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-gray-100">
          <UserPlus size={20} />
          New Patient
        </button>

      </nav>

      <div className="absolute bottom-0 w-64 border-t p-4">
        <button className="flex items-center gap-3 text-red-500">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;