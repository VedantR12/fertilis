import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "./services/auth";
import useAuthStore from "./store/authStore";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Patients from "./pages/admin/Patients";
import NewPatient from "./pages/admin/NewPatient";
import Samples from "./pages/admin/Samples";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import PatientDetails from "@/pages/patients/PatientDetails";
import EditPatient from "@/pages/patients/EditPatient";
import RegisterSample from "@/pages/samples/RegisterSample";
import SampleDetails from "@/pages/samples/SampleDetails";
import SemenAnalysis from "@/pages/semen_analysis/SemenAnalysis";

function App() {
  const { token, restoreUser, logout, setLoading } = useAuthStore();
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser();
        restoreUser(user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token, restoreUser, logout, setLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/patients" element={<Patients />} />
          <Route path="/admin/patients/new" element={<NewPatient />} />
          <Route path="/admin/samples" element={<Samples />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/patients/:patientCode" element={<PatientDetails />} />
          <Route path="/admin/patients/:patientCode/edit" element={<EditPatient />} />
          <Route path="/admin/patients/:patientCode/samples/new" element={<RegisterSample />} />
          <Route path="/admin/samples/:sampleCode" element={<SampleDetails />} />
          <Route path="/admin/samples/:sampleCode/analysis" element={<SemenAnalysis />} />
        </Route>

        {/* We'll add these when those modules exist */}
        {/* /lab */}
        {/* /admin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;