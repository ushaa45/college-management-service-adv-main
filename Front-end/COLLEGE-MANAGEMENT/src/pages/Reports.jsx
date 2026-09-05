import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import API from "../api/axios";

const STATUS_ORDER = [
  "PENDING",
  "UNDER_REVIEW",
  "APPROVED",
  "PAYMENT_PENDING",
  "PAID",
  "ADMITTED",
  "REJECTED",
];

const STATUS_COLORS = {
  PENDING: "#94a3b8",
  UNDER_REVIEW: "#60a5fa",
  APPROVED: "#34d399",
  PAYMENT_PENDING: "#fbbf24",
  PAID: "#38bdf8",
  ADMITTED: "#C88A2E",
  REJECTED: "#f87171",
};

function Reports() {
  const [applications, setApplications] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [appsRes, collegesRes] = await Promise.all([
        API.get("/api/applications"),
        API.get("/api/college"),
      ]);
      setApplications(appsRes.data ?? []);
      setColleges(collegesRes.data ?? []);
    } catch (err) {
      console.error("Reports data error:", err);
      setError("Unable to load report data.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    const value = Number(amount) || 0;
    return `₹${value.toLocaleString("en-IN")}`;
  };

  // ==============================
  // Status funnel
  // ==============================
  const statusCounts = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = applications.filter((a) => a.status === status).length;
    return acc;
  }, {});
  const maxStatusCount = Math.max(1, ...Object.values(statusCounts));

  // ==============================
  // Revenue
  // ==============================
  const paidApplications = applications.filter(
    (a) => a.paymentStatus === "PAID"
  );
  const totalRevenue = paidApplications.reduce(
    (sum, a) => sum + (Number(a.amount) || 0),
    0
  );
  const avgRevenue = paidApplications.length
    ? totalRevenue / paidApplications.length
    : 0;

  // ==============================
  // Applications by college
  // ==============================
  const collegeMap = colleges.reduce((acc, c) => {
    acc[c.collegeId] = c.collegeName;
    return acc;
  }, {});

  const collegeCounts = {};
  applications.forEach((a) => {
    const name = collegeMap[a.collegeId] || "Unassigned";
    collegeCounts[name] = (collegeCounts[name] || 0) + 1;
  });
  const collegeEntries = Object.entries(collegeCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const maxCollegeCount = Math.max(1, ...Object.values(collegeCounts));

  // ==============================
  // CSV Export
  // ==============================
  const exportCsv = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Course",
      "College",
      "Status",
      "Payment Status",
      "Amount",
    ];

    const rows = applications.map((a) => [
      a.id,
      a.name || "",
      a.email || "",
      a.phone || "",
      a.course || "",
      collegeMap[a.collegeId] || "",
      a.status || "",
      a.paymentStatus || "",
      a.amount ?? "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `applications_report_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 text-sm">
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-gray-500 mb-3">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-[#C88A2E] hover:bg-[#b17a26] text-white text-sm font-medium rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          eyebrow="Insights"
          title="Reports"
          description="Admissions and revenue at a glance."
        />
        <button
          onClick={exportCsv}
          className="px-4 py-2 bg-[#C88A2E] hover:bg-[#b17a26] text-white text-sm font-semibold rounded-md whitespace-nowrap"
        >
          Export CSV
        </button>
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 border-l-4 border-l-[#C88A2E] rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Total Revenue
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 border-l-4 border-l-emerald-500 rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Paid Applications
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {paidApplications.length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 border-l-4 border-l-blue-500 rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Average Payment
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(avgRevenue)}
          </p>
        </div>
      </div>

      {/* Application status funnel */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Applications by Status
        </h2>
        <div className="space-y-3">
          {STATUS_ORDER.map((status) => {
            const count = statusCounts[status];
            const widthPct = (count / maxStatusCount) * 100;
            return (
              <div key={status} className="flex items-center gap-3">
                <span className="w-36 text-xs font-medium text-gray-600 shrink-0">
                  {status.replace(/_/g, " ")}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: STATUS_COLORS[status],
                    }}
                  />
                </div>
                <span className="w-10 text-right text-sm font-semibold text-gray-800">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
        {applications.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">
            No applications yet — this report will populate as students
            apply.
          </p>
        )}
      </div>

      {/* Applications by college */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Applications by College
        </h2>
        {collegeEntries.length === 0 ? (
          <p className="text-sm text-gray-500">
            No applications yet.
          </p>
        ) : (
          <div className="space-y-3">
            {collegeEntries.map(([name, count]) => {
              const widthPct = (count / maxCollegeCount) * 100;
              return (
                <div key={name} className="flex items-center gap-3">
                  <span className="w-44 text-xs font-medium text-gray-600 shrink-0 truncate">
                    {name}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#C88A2E] transition-all"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-semibold text-gray-800">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;