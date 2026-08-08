import { CalendarDays, Users, TestTube2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/api/dashboard";

const Dashboard = () => {

  const { user } = useAuthStore();

  const [stats, setStats] = useState({
    total_patients: 0,
    total_samples: 0,
  });

  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  { stats.total_patients }

  useEffect(() => {

    async function loadDashboard() {

      try {

        const data = await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadDashboard();

  }, []);

  return (

    <div className="space-y-10">

      <div>

        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800">
          Welcome, {user?.full_name || user?.username} !!
        </h1>

        <div className="mt-3 flex items-center gap-2 text-slate-500">
          <CalendarDays className="h-4 w-4" />
          <span>{today}</span>
        </div>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-[#6C2E87] p-8 shadow-sm">

        <p className="text-sm font-medium uppercase tracking-wider text-slate-300">
          Total Patients
        </p>

        <h2 className="mt-3 text-6xl font-extrabold tracking-tight text-white">
          {stats.total_patients}
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-3xl border border-slate-200 bg-[#6C2E87] p-8 flex flex-col justify-between min-h-[260px] shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

          <div>

            <Users className="mb-6 h-14 w-14 rounded-2xl bg-white p-3 text-[#6C2E87]" />

            <h2 className="text-2xl font-bold text-white">
              Patients
            </h2>

            <p className="text-sm leading-7 text-slate-300 mt-2">
              Register patients, search records and manage patient information.
            </p>

          </div>

          <Link to="/admin/patients" className="block mt-8">
            <Button className="bg-gradient-to-r from-[#7837E7] to-[#6125BF] text-white shadow-lg" size="lg">
              Manage Patients
            </Button>
          </Link>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-[#6C2E87] p-8 flex flex-col justify-between min-h-[260px] shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

          <div>

            <TestTube2 className="mb-6 h-14 w-14 rounded-2xl bg-white p-3 text-[#6C2E87]" />

            <h2 className="text-2xl font-bold text-white">
              Tests
            </h2>

            <p className="text-sm leading-7 text-slate-300 mt-2">
              Start a new laboratory investigation.
            </p>

          </div>

          <Link to="/admin/tests" className="block mt-8">
            <Button className="bg-gradient-to-r from-[#7837E7] to-[#6125BF] text-white shadow-lg" size="lg">
              Start Test
            </Button>
          </Link>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-[#6C2E87] p-8 flex flex-col justify-between min-h-[260px] shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

          <div>

            <FileText className="mb-6 h-14 w-14 rounded-2xl bg-white p-3 text-[#6C2E87]" />

            <h2 className="text-2xl font-bold text-white">
              Reports
            </h2>

            <p className="text-sm leading-7 text-slate-300 mt-2">
              View previous reports and print them.
            </p>

          </div>

          <Link
            to="/admin/patients?mode=reports"
            className="block mt-8"
          >
            <Button className="bg-gradient-to-r from-[#7837E7] to-[#6125BF] text-white shadow-lg" size="lg">
              Manage Reports
            </Button>
          </Link>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;