import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import College from "./pages/College";
import Hostel from "./pages/Hostel";
import Library from "./pages/Library";
import Books from "./pages/Books";
import Rooms from "./pages/Room";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CollegeDetails from "./pages/CollegeDetails";
import ApplyNow from "./pages/ApplyNow";
import ApplicationStatus from "./pages/ApplicationStatus";

import About from "./pages/About";
import Administration from "./pages/Administration";
import Admissions from "./pages/Admissions";
import Faculty from "./pages/Faculty";
import AuditLogs from "./pages/AuditLogs";
import AdminProfile from "./pages/AdminProfile";
import Reports from "./pages/Reports";



function Layout() {
  const location = useLocation();

  // ❗ Hide sidebar only for college details page
  const hideSidebar = location.pathname.startsWith("/college/") ||
    location.pathname.startsWith("/apply/") ||
    location.pathname.startsWith("/application-status/");
  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}

      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college"
            element={
              <ProtectedRoute>
                <College />
              </ProtectedRoute>
            }
          />

          {/* ✅ College Details (NO SIDEBAR) */}
          <Route
            path="/college/:id/*"
            element={
              <ProtectedRoute>
                <CollegeDetails />
              </ProtectedRoute>
            }
          ><Route
              index
              element={<About />}
            />

            <Route
              path="about"
              element={<About />}
            />

            <Route
              path="administration"
              element={<Administration />}
            />

            <Route
              path="students"
              element={<Students />}
            />

            <Route
              path="faculty"
              element={<Faculty />}
            />

            <Route
              path="admissions"
              element={<Admissions />}
            />
          </Route>

          <Route
            path="/apply/:id"
            element={
              <ProtectedRoute>
                <ApplyNow />
              </ProtectedRoute>
            }
          />

          <Route
            path="/application-status/:id"
            element={
              <ProtectedRoute>
                <ApplicationStatus />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hostel"
            element={
              <ProtectedRoute>
                <Hostel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />

          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AuditLogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
          path="/reports"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Reports />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
