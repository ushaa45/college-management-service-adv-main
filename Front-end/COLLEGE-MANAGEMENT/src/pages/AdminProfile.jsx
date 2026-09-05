import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import API from "../api/axios";

function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeStatus, setChangeStatus] = useState(null); // { type: "success"|"error", message }
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await API.get("/auth/profile");
      setProfile(response.data);
    } catch (err) {
      console.error("Profile error:", err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangeStatus(null);

    if (newPassword !== confirmPassword) {
      setChangeStatus({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setChangeStatus({ type: "error", message: "New password must be at least 6 characters." });
      return;
    }

    setChanging(true);
    try {
      await API.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setChangeStatus({ type: "success", message: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Change password error:", err);
      const msg =
        err.response?.data && typeof err.response.data === "string"
          ? err.response.data
          : "Unable to update password.";
      setChangeStatus({ type: "error", message: msg });
    } finally {
      setChanging(false);
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "—";
    const date = new Date(ts);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Admin Profile"
        description="Your account details and security settings."
      />

      {/* Profile card */}
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#C88A2E] rounded-lg p-6">
        {loading ? (
          <div className="text-sm text-gray-500">Loading profile...</div>
        ) : error ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{error}</span>
            <button
              onClick={fetchProfile}
              className="px-4 py-2 bg-[#C88A2E] hover:bg-[#b17a26] text-white text-sm font-medium rounded-md"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0b1b30] text-[#E9C77E] text-2xl font-semibold">
              {profile.username?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {profile.username}
              </h2>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Role:</span>{" "}
                  <span className="font-medium text-gray-800">
                    {profile.role}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Account created:</span>{" "}
                  <span className="font-medium text-gray-800">
                    {formatDate(profile.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change password card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-3">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/40"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/40"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/40"
          />

          {changeStatus && (
            <p
              className={`text-sm ${
                changeStatus.type === "success"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {changeStatus.message}
            </p>
          )}

          <button
            type="submit"
            disabled={changing}
            className="w-full bg-[#C88A2E] hover:bg-[#b17a26] disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-md"
          >
            {changing ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;