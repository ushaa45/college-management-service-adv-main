import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import Badge from "../components/ui/Badge";
import {
  IconUsers,
  IconBuilding,
  IconBook,
  IconDoor,
  IconClipboard,
} from "../components/ui/Icons";
import API from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    colleges: 0,
    books: 0,
    rooms: 0,
    hostels: 0,
    applications: 0,
    paymentsTotal: 0,
  });

  const [applications, setApplications] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState("");

  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  const [error, setError] = useState("");
  const [applicationsError, setApplicationsError] = useState("");
  const [paymentsError, setPaymentsError] = useState("");

  // ==============================
  // Fetch Dashboard Statistics
  // ==============================
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/api/dashboard/starts");

      setStats({
        students: response.data.students ?? 0,
        colleges: response.data.colleges ?? 0,
        books: response.data.books ?? 0,
        rooms: response.data.rooms ?? 0,
        hostels: response.data.hostels ?? response.data.hostel ?? 0,
        applications: response.data.applications ?? 0,
        paymentsTotal: response.data.paymentsTotal ?? 0,
      });
    } catch (err) {
      console.error("Dashboard stats error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }

      setError("Unable to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  // ============================== 
  // Fetch Recent Applications  
  //============================== 
  const fetchRecentApplications = async () => {
    try {
      setApplicationsLoading(true);
      setApplicationsError("");
      const response = await API.get("/api/applications/recent");
      setApplications(response.data ?? []);
    } catch (err) {
      console.error("Recent applications error:", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }
      setApplicationsError("Unable to load recent applications.");
    }
    finally {
      setApplicationsLoading(false);
    }
  };

  // ==============================
  // Fetch Recent Payments
  // ==============================
  const fetchRecentPayments = async () => {
    try {
      setPaymentsLoading(true);
      setPaymentsError("");
      const response = await API.get("/api/payment/recent");
      setPayments(response.data ?? []);
    } catch (err) {
      console.error("Recent payments error:", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }
      setPaymentsError("Unable to load recent payments.");
    } finally {
      setPaymentsLoading(false);
    }
  };

  // ==============================  
  //Fetch Notifications 
  // ============================== 
  const fetchNotifications = async () => {
    try {
      setNotificationsError("");
      const response = await API.get("/api/notifications");
      setNotifications(response.data ?? []);
    } catch (err) {
      console.error("Notifications error:", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      } setNotificationsError("Unable to load notifications.");
    } finally {
      setNotificationsLoading(false);
    }
  };
  // ============================== 
  // Mark Notification As Read 
  // ============================== 
  const markNotificationAsRead = async (id) => {
    try {
      await API.put(`/api/notifications/${id}/read`);
      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) =>
          notification.id === id ? { ...notification, read: true, } : notification));
    } catch (err) {
      console.error("Mark notification as read error:", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }
    }
  };
  // ==============================
  // Load Dashboard
  // ==============================
  useEffect(() => {
    fetchDashboardStats();
    fetchRecentApplications();

    // Refresh notifications every 10 seconds 
    const notificationInterval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  // ============================== 
  // Unread Notifications 
  // ============================== 
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read);
  const unreadCount = unreadNotifications.length;

  // ============================== 
  // Notification Icon 
  // ============================== 

  const getNotificationIcon = (title) => {
    switch (title) {
      case "New Application":
        return "📄";
      case "New Student":
        return "👨‍🎓";
      case "Payment Received":
        return "💰";
      default:
        return "🔔";
    }
  };
  // ==============================
  // Status Badge
  // ==============================
  const getStatusVariant = (status) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return "success";

      case "PENDING":
        return "warning";

      case "FAILED":
        return "danger";

      default:
        return "neutral";
    }
  };

  const formatCurrency = (amount) => {
    const value = Number(amount) || 0;
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-8">
      {/* ==============================
          Page Header
      ============================== */}
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="A snapshot of everything on record today."
      />

      {/* ============================== 
     Notifications 
============================== */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-xl">

              🔔

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>)
              }
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Updates
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                Notifications
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Recent activity from your college management system.
              </p>
            </div>
          </div>
          <button type="button"
            onClick={fetchNotifications}
            className="text-sm font-semibold text-slate-700 hover:text-slate-900" >
            Refresh
          </button>
        </div>

        {/* Error */}

        {notificationsError && (
          <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center justify-between gap-4">
              <span>{notificationsError} </span>
              <button onClick={fetchNotifications}
                className="font-semibold underline hover:no-underline" >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading */}

        {
          notificationsLoading ? (
            <div className="px-6 py-10 text-center text-sm text-slate-500"> Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            /* Empty */
            <div className="px-6 py-10 text-center">
              <div className="text-3xl">
                🔔
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700">
                No notifications yet.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                New applications, students and payments will appear here.
              </p>
            </div>
          ) : (
            /* Notification List */
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <div key={notification.id} onClick={() => !notification.read && markNotificationAsRead(notification.id)
                } className={`flex cursor-pointer items-start gap-4 px-6 py-4 transition hover:bg-slate-50 
 ${!notification.read ? "bg-blue-50/50" : "bg-white"}`} >
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg">
                    {getNotificationIcon(notification.title)}
                  </div>
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {notification.title}
                      </h3>
                      {!notification.read && (<span className="h-2 w-2 rounded-full bg-blue-600"></span>)}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : ""}
                    </p>
                  </div>
                  {/* Read status */}
                  <div className="shrink-0">
                    {notification.read ? (<span className="text-xs text-slate-400"> Read </span>) : (
                      <span className="text-xs font-semibold text-blue-600">
                        New
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </section >

      {/* ==============================
          Statistics
    ============================== */}
      {
        error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center justify-between gap-4">
              <span>{error}</span>

              <button
                onClick={fetchDashboardStats}
                className="font-semibold underline hover:no-underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      }

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Colleges"
          value={loading ? "..." : stats.colleges}
          spine="sage"
          icon={<IconBuilding />}
        />
        <StatCard
          label="Students"
          value={loading ? "..." : stats.students}
          spine="ink"
          icon={<IconUsers />}
        />
        <StatCard
          label="Applications"
          value={loading ? "..." : stats.applications}
          spine="rust"
          icon={<IconClipboard />}
        />
        <StatCard
          label="Payments"
          value={loading ? "..." : formatCurrency(stats.paymentsTotal)}
          spine="gold"
          icon={<IconClipboard />}
        />
      </div>

      {/* ==============================
          Secondary Statistics
      ============================== */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Books"
          value={loading ? "..." : stats.books}
          spine="gold"
          icon={<IconBook />}
        />
        <StatCard
          label="Rooms"
          value={loading ? "..." : stats.rooms}
          spine="rust"
          icon={<IconDoor />}
        />
        <StatCard
          label="Hostels"
          value={loading ? "..." : stats.hostels}
          spine="blue"
          icon={<IconBuilding />}
        />
      </div>

      {/* ==============================
          Recent Applications
      ============================== */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Admissions
            </p>

            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              The latest applications received by the institution.
            </p>
          </div>

          <button
            type="button"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            onClick={fetchRecentApplications}
          >
            Refresh
          </button>
        </div>

        {/* Applications Error */}
        {applicationsError && (
          <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center justify-between gap-4">
              <span>{applicationsError}</span>

              <button
                onClick={fetchRecentApplications}
                className="font-semibold underline hover:no-underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {applicationsLoading && (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            Loading recent applications...
          </div>
        )}

        {/* Empty State */}
        {!applicationsLoading &&
          !applicationsError &&
          applications.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="text-sm font-medium text-slate-700">
                No applications yet.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                New applications will appear here.
              </p>
            </div>
          )}

        {/* Applications Table */}
        {!applicationsLoading &&
          !applicationsError &&
          applications.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Course
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {application.name || "Unknown"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Application #{application.id}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {application.email || "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {application.course || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          variant={getStatusVariant(
                            application.paymentStatus
                          )}
                        >
                          {application.paymentStatus || "PENDING"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </section>
      {/* ==============================
          Recent Payments
      ============================== */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Finance
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Recent Payments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              The latest payments processed through the system.
            </p>
          </div>
          <button
            type="button"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            onClick={fetchRecentPayments}
          >
            Refresh
          </button>
        </div>

        {paymentsError && (
          <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center justify-between gap-4">
              <span>{paymentsError}</span>
              <button
                onClick={fetchRecentPayments}
                className="font-semibold underline hover:no-underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {paymentsLoading && (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            Loading recent payments...
          </div>
        )}

        {!paymentsLoading && !paymentsError && payments.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="text-sm font-medium text-slate-700">
              No payments yet.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              New payments will appear here.
            </p>
          </div>
        )}

        {!paymentsLoading && !paymentsError && payments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Payment ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {payment.applicantName || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(payment.status)}>
                        {payment.status || "PENDING"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {payment.paymentId || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div >
  );
}

export default Dashboard;

