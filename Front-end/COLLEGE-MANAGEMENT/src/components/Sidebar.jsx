import { Link, useLocation,useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import API from "../api/axios";
import {getRoleFromToken} from "../utils/auth";
import {
  IconHome,
  IconUsers,
  IconBuilding,
  IconBed,
  IconBook,
  IconDoor,
  IconSeal,
  IconLogout,
  IconUser,
  IconChartbar,
} from "./ui/Icons";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: IconHome },
  { name: "Students", path: "/students", icon: IconUsers },
  { name: "College", path: "/college", icon: IconBuilding },
  { name: "Hostel", path: "/hostel", icon: IconBed },
  { name: "Library", path: "/library", icon: IconBook },
  { name: "Books", path: "/books", icon: IconBook },
  { name: "Rooms", path: "/rooms", icon: IconDoor },
  { name: "Audit Logs", path: "/audit-logs", icon: IconSeal, adminOnly: true },
  { name: "Reports", path: "/reports", icon: IconChartbar, adminOnly: true },
];

function Sidebar() {
  const navigate = useNavigate();
  const role = getRoleFromToken();
  const isAdmin = role === "ADMIN";

    const visibleMenu = menu.filter((item) => !item.adminOnly || isAdmin);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("No refresh token found in localStorage.");
        navigate("/login");
        return;
      }

      await API.post("/auth/logout", { refreshToken });
      localStorage.removeItem("refreshToken");    
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };  
  const location = useLocation();

  return (
    <div className="flex w-60 shrink-0 flex-col bg-[#0b1b30] text-[#EEF2F7]">
      {/* Crest / brand mark */}
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C88A2E] text-[#C88A2E]">
          <IconSeal />
        </span>
        <div>
          <p className="font-display text-base font-semibold leading-tight text-white">
            Campus Ledger
          </p>
          <p className="font-mono-num text-[10px] uppercase tracking-widest text-white/40">
            Admin Console
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {visibleMenu.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors
                ${
                  active
                    ? "bg-[#C88A2E]/15 text-[#E9C77E] font-semibold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                  active ? "bg-[#C88A2E] opacity-100" : "opacity-0"
                }`}
              />
              <Icon className={active ? "text-[#E9C77E]" : "text-white/50 group-hover:text-white"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="font-mono-num text-[10px] text-white/30">
          v1.0 · Est. 2026
        </p>
      </div>

        {/* Account link — sits just above Logout */}
      <div className="border-t border-white/10 px-3 py-3">
        <Link
          to="/profile"
          className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors
            ${
              location.pathname === "/profile"
                ? "bg-[#C88A2E]/15 text-[#E9C77E] font-semibold"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
        >
          <IconUser
            className={
              location.pathname === "/profile"
                ? "text-[#E9C77E]"
                : "text-white/50"
            }
          />
          <div className="flex flex-col leading-tight">
            <span>Admin Profile</span>
            <span className="text-[10px] uppercase tracking-widest text-[#C88A2E]">
              {role || "Account"}
            </span>
          </div>
        </Link>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-md 
                    bg-red-600 px-4 py-3 text-sm font-semibold text-white
                    shadow-md transition-all duration-200
                    hover:bg-red-700 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <IconLogout className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
