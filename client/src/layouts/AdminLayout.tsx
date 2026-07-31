import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const AdminLayout = () => {
    return (
        <div>

            <Sidebar />

            <div className="ml-64">

                <Navbar />

                <main className="min-h-screen bg-gray-50 p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;