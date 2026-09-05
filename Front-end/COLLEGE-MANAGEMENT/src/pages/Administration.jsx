import { useEffect, useState } from "react";
import API from "../api/axios";

function Administration() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statuses = [
    "PENDING",
    "UNDER_REVIEW",
    "APPROVED",
    "REJECTED",
    "PAYMENT_PENDING",
    "PAID",
    "ADMITTED",
  ];

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/api/applications");

      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Update application status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/api/applications/${id}/status`, null, {
        params: {
          status: status,
        },
      });

      // Refresh application list
      fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update application status.");
    }
  };

  // Status badge style
  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";

      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800";

      case "APPROVED":
        return "bg-green-100 text-green-800";

      case "REJECTED":
        return "bg-red-100 text-red-800";

      case "PAYMENT_PENDING":
        return "bg-orange-100 text-orange-800";

      case "PAID":
        return "bg-emerald-100 text-emerald-800";

      case "ADMITTED":
        return "bg-purple-100 text-purple-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Application Administration
        </h1>

        <p className="mt-2 text-gray-600">
          Review and manage student applications.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-lg border bg-white p-6 text-center">
          Loading applications...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Applications */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">

          {applications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No applications found.
            </div>
          ) : (
            <table className="w-full text-left">

              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >

                    {/* ID */}
                    <td className="px-6 py-4">
                      {application.id}
                    </td>

                    {/* Applicant */}
                    <td className="px-6 py-4 font-medium">
                      {application.name}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      {application.email}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      {application.phone}
                    </td>

                    {/* Course */}
                    <td className="px-6 py-4">
                      {application.course}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {application.status || "PENDING"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <select
                        value={application.status || "PENDING"}
                        onChange={(e) =>
                          updateStatus(
                            application.id,
                            e.target.value
                          )
                        }
                        className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Administration;