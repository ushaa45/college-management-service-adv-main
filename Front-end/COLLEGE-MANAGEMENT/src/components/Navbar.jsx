import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Button from "./ui/Button";
import { IconLogout, IconSeal } from "./ui/Icons";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.sub, role: decoded.role || "USER" });
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await API.post("/auth/logout", { refreshToken });
    } catch (err) {
      console.log("Logout error", err);
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="
  flex items-center justify-between
  border-b border-[#D7E0EA]
  bg-[#FFFEFB]
  px-6 py-3.5
  dark:border-gray-800
  dark:bg-gray-950
">
      <div>
        <p className="font-mono-num text-[11px] uppercase tracking-widest text-[#A66E1E]">
          Welcome back
        </p>
        <p className="font-display text-lg font-semibold text-[#0b1b30]">
          {user?.username || "Guest"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <span className="hidden items-center gap-2 rounded-full border border-[#D7E0EA] bg-[#EEF2F7] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#132A46] sm:flex">
            <IconSeal className="h-3.5 w-3.5" />
            {user.role}
          </span>
        )}
        {/* 🌙 Dark / ☀️ Light mode */}
        <ThemeToggle />

        {/* <Button variant="outline" onClick={handleLogout}>
          <IconLogout />
          Logout
        </Button> */}
      </div>
    </div>
  );
}

export default Navbar;
