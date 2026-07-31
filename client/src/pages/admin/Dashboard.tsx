import { CalendarDays, Users, TestTube2, FileText, ArrowRight } from "lucide-react";
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

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Welcome, {user?.full_name || user?.username} !!
        </h1>

        <div className="flex items-center gap-2 text-muted-foreground mt-2">
          <CalendarDays className="h-4 w-4" />
          <span>{today}</span>
        </div>

      </div>

      <div className="rounded-xl border p-6">

        <p className="text-muted-foreground text-sm">
          Total Patients
        </p>

        <h2 className="text-5xl font-bold mt-2">
          {stats.total_patients}
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-2xl border bg-card p-8 flex flex-col justify-between min-h-[260px] shadow-sm hover:shadow-md transition-all duration-200">

          <div>

            <Users className="h-12 w-12 mb-6 text-primary" />

            <h2 className="text-xl font-semibold">
              Patients
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Register patients, search records and manage patient information.
            </p>

          </div>

          <Link to="/admin/patients" className="block mt-8">
    <Button className="w-full" size="lg">
        Manage Patients
    </Button>
</Link>

        </div>

        <div className="rounded-2xl border bg-card p-8 flex flex-col justify-between min-h-[260px] shadow-sm hover:shadow-md transition-all duration-200">

          <div>

            <TestTube2 className="h-12 w-12 mb-6 text-primary" />

            <h2 className="text-xl font-semibold">
              Tests
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Start a new laboratory investigation.
            </p>

          </div>

          <Link to="/admin/tests" className="block mt-8">
    <Button className="w-full" size="lg">
        Start Test
    </Button>
</Link>

        </div>

        <div className="rounded-2xl border bg-card p-8 flex flex-col justify-between min-h-[260px] shadow-sm hover:shadow-md transition-all duration-200">

          <div>

            <FileText className="h-12 w-12 mb-6 text-primary" />

            <h2 className="text-xl font-semibold">
              Reports
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              View previous reports and print them.
            </p>

          </div>

          <Link
    to="/admin/patients?mode=reports"
    className="block mt-8"
>
    <Button className="w-full" size="lg">
        Manage Reports
    </Button>
</Link>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;