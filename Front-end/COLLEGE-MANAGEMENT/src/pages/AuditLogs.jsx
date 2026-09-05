import { useEffect, useState } from "react";
import API from "../api/axios";

const ITEMS_PER_PAGE = 8;

const ACTION_STYLES = {
  CREATED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  UPDATED: "bg-blue-50 text-blue-700 border-blue-200",
  EDITED: "bg-blue-50 text-blue-700 border-blue-200",
  DELETED: "bg-red-50 text-red-700 border-red-200",
  LOGIN: "bg-[#C88A2E]/10 text-[#8a5f1c] border-[#C88A2E]/30",
  DEFAULT: "bg-gray-50 text-gray-700 border-gray-200",
};

function ActionBadge({ action }) {
  const style = ACTION_STYLES[action?.toUpperCase()] || ACTION_STYLES.DEFAULT;
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${style}`}
    >
      {action || "UNKNOWN"}
    </span>
  );
}

function formatTimestamp(ts) {
  if (!ts) return "—";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return ts;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, actionFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/api/audit-logs");
      const data = Array.isArray(response.data) ? response.data : [];
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch audit logs:", err);
      setError("Unable to load audit logs.");
    } finally {
      setLoading(false);
    }
  };

  const actionOptions = [
    "ALL",
    ...Array.from(new Set(logs.map((l) => l.action).filter(Boolean))),
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesAction =
      actionFilter === "ALL" || log.action === actionFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      log.username?.toLowerCase().includes(q) ||
      log.description?.toLowerCase().includes(q) ||
      log.entity?.toLowerCase().includes(q);
    return matchesAction && matchesSearch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  );
  const currentLogs = filteredLogs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-[#C88A2E] uppercase">
            Operations
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            Audit Logs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Every action, tracked and timestamped.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C88A2E]/10 text-[#8a5f1c] border border-[#C88A2E]/30">
          ADMIN
        </span>
      </div>

      {/* Filter bar */}
      <div className="mt-6 bg-white border border-gray-200 border-l-4 border-l-[#C88A2E] rounded-lg p-5 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by user, entity, or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/40"
        />
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/40 sm:w-48"
        >
          {actionOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "ALL" ? "All actions" : opt}
            </option>
          ))}
        </select>
        <button
          onClick={fetchLogs}
          className="border border-gray-200 rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {/* Content */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            Loading audit logs...
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500 mb-3">{error}</p>
            <button
              onClick={fetchLogs}
              className="px-4 py-2 bg-[#C88A2E] hover:bg-[#b17a26] text-white text-sm font-medium rounded-md"
            >
              Retry
            </button>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            No audit logs match your filters.
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Entity</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Date &amp; Time</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {log.username || "—"}
                    </td>
                    <td className="px-6 py-3">
                      <ActionBadge action={log.action} />
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {log.entity || "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {log.description || "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      {formatTimestamp(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-center gap-6 py-4 border-t border-gray-100 text-sm">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={
                  page === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:text-[#C88A2E]"
                }
              >
                Prev
              </button>
              <span className="text-gray-500">
                Page {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  page === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:text-[#C88A2E]"
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuditLogs;