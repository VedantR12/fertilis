import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const ReceptionLayout = () => {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default ReceptionLayout;