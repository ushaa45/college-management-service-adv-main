import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Button from "../components/ui/Button";
import { IconSeal } from "../components/ui/Icons";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      setError("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — identity panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-[#0b1b30] p-12 text-[#EEF2F7] lg:flex">
        <div className="absolute inset-0 bg-ledger-rule opacity-40" />
        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C88A2E] text-[#C88A2E]">
            <IconSeal />
          </span>
          <span className="font-display text-xl font-semibold text-white">
            Campus Ledger
          </span>
        </div>

        <div className="relative max-w-sm">
          <p className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#C88A2E]">
            Est. 2026 · Records &amp; Registry
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold leading-tight text-white">
            One ledger for every college, student, and record.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Admissions, hostels, libraries and rosters — kept the way a
            registrar keeps them: precise, indexed, and always at hand.
          </p>
        </div>

        <p className="relative font-mono-num text-xs text-white/30">
          Roll No. 000001 — Present since day one.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex w-full flex-col items-center justify-center bg-[#FAF6EE] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C88A2E] text-[#A66E1E]">
              <IconSeal />
            </span>
          </div>

          <p className="font-mono-num text-xs uppercase tracking-[0.15em] text-[#A66E1E]">
            Sign in
          </p>
          <h2 className="font-display mt-1 text-3xl font-semibold text-[#0b1b30]">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-[#4B5566]">
            Enter your credentials to open the ledger.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {error && (
              <p className="rounded-md border border-[#f0cabf] bg-[#FBEAE5] px-3 py-2 text-sm text-[#B4472E]">
                {error}
              </p>
            )}

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4B5566]">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="jane.doe"
                className="w-full rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2.5 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30"
                value={data.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4B5566]">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2.5 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              disabled={loading}
              className="w-full py-2.5"
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>

            <p className="pt-2 text-center text-sm text-[#4B5566]">
              Don&rsquo;t have an account?{" "}
              <span
                className="cursor-pointer font-semibold text-[#132A46] underline underline-offset-2"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
