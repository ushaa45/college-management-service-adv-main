import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import Button from "../components/ui/Button";
import { IconSeal } from "../components/ui/Icons";

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      return "Please fill all fields";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(data.email)) return "Invalid email format";
    if (data.password.length < 6) return "Password must be at least 6 characters";
    if (data.password !== data.confirmPassword) return "Passwords do not match";
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (validation !== true) {
      setError(validation);
      return;
    }
    try {
      setLoading(true);
      setError("");
      await API.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2.5 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30";
  const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4B5566]";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF6EE] px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-8 shadow-[0_1px_2px_rgba(11,27,48,0.06)]">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C88A2E] text-[#A66E1E]">
            <IconSeal />
          </span>
          <p className="font-mono-num text-xs uppercase tracking-[0.15em] text-[#A66E1E]">
            New enrollment
          </p>
          <h2 className="font-display mt-1 text-2xl font-semibold text-[#0b1b30]">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <p className="rounded-md border border-[#f0cabf] bg-[#FBEAE5] px-3 py-2 text-center text-sm text-[#B4472E]">
              {error}
            </p>
          )}

          <div>
            <label className={labelClass}>Username</label>
            <input name="username" className={inputClass} value={data.username} onChange={handleChange} />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" className={inputClass} value={data.email} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" name="password" className={inputClass} value={data.password} onChange={handleChange} />
            </div>
            <div>
              <label className={labelClass}>Confirm</label>
              <input type="password" name="confirmPassword" className={inputClass} value={data.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Role</label>
            <select name="role" className={inputClass} value={data.role} onChange={handleChange}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <Button type="submit" variant="accent" disabled={loading} className="w-full py-2.5">
            {loading ? "Creating account…" : "Create account"}
          </Button>

          <p className="pt-1 text-center text-sm text-[#4B5566]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#132A46] underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
