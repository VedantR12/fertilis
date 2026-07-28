import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReceptionLayout from "./layouts/ReceptionLayout";
import Dashboard from "./pages/reception/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<ReceptionLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;