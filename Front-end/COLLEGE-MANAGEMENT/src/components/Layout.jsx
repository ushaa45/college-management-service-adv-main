import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import College from "../pages/College";
import Library from "../pages/Library";
import Hostel from "../pages/Hostel";
import Books from "../pages/Books";
import ProtectedRoute from "../components/ProtectedRoute";

import CollegeDetails from "../pages/CollegeDetails";
import ApplyNow from "../pages/ApplyNow";
import About from "../pages/About";
import Administration from "../pages/Administration";
import Faculty from "../pages/Faculty";
import Admissions from "../pages/Admissions";

function Layout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/college/");

  if (hideLayout) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/college/:id/*"
          element={
            <ProtectedRoute>
              <CollegeDetails />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="about" replace />} />
          <Route path="about" element={<About />} />
          <Route path="administration" element={<Administration />} />
          <Route path="students" element={<Students />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="admissions" element={<Admissions />} />
        </Route>

        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute>
              <ApplyNow />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-[#FAF6EE]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-auto p-6 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
            <Route path="/college" element={<ProtectedRoute><College /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
            <Route path="/hostel" element={<ProtectedRoute><Hostel /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Layout;
