import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#ffffff]">
            <Sidebar />

            <div className="ml-[320px] p-8">
                <main className="min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;