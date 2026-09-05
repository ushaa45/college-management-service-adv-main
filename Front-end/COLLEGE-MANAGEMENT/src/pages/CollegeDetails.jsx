import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  NavLink,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";

import API from "../api/axios";
import CollegeFooter from "../components/CollegeFooter";
import defaultLogo from "../assets/logo.png";

function CollegeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH COLLEGE
  // ==============================

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/api/college/${id}`);

        console.log("College Details:", res.data);

        setCollege(res.data);
      } catch (err) {
        console.error("Error fetching college:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  // ==============================
  // SCROLL TOP WHEN PAGE CHANGES
  // ==============================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] p-6">
        <div className="animate-pulse">

          <div className="mb-6 h-10 w-40 rounded bg-[#EEF2F7]" />

          <div className="mb-6 h-24 rounded-lg bg-[#EEF2F7]" />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-40 rounded-lg bg-[#EEF2F7]" />
            <div className="h-40 rounded-lg bg-[#EEF2F7]" />
          </div>

        </div>
      </div>
    );
  }

  // ==============================
  // COLLEGE NOT FOUND
  // ==============================

  if (!college) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF6EE]">

        <div className="text-center">

          <h1 className="mb-2 text-2xl font-semibold text-[#0b1b30]">
            College not found
          </h1>

          <p className="mb-5 text-[#4B5566]">
            We couldn't find the requested college.
          </p>

          <button
            onClick={() => navigate("/college")}
            className="rounded-md bg-[#132A46] px-5 py-2.5 font-semibold text-white hover:bg-[#0b1b30]"
          >
            Back to Colleges
          </button>

        </div>

      </div>
    );
  }

  // ==============================
  // NAVIGATION STYLE
  // ==============================

  const linkClass = ({ isActive }) =>
    `border-b-2 pb-1 text-sm transition ${
      isActive
        ? "border-[#E9C77E] font-semibold text-[#E9C77E]"
        : "border-transparent text-white/70 hover:border-white/40 hover:text-white"
    }`;

  // ==============================
  // BREADCRUMB
  // ==============================

  const breadcrumbItems = [
    {
      label: "College",
      path: "/college",
    },
    {
      label: college.collegeName,
      path: `/college/${id}`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE]">

      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1b30] px-6 py-3 text-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* NAV LINKS */}

          <div className="flex flex-wrap gap-6">

            <NavLink
              to={`/college/${id}/about`}
              className={linkClass}
            >
              About
            </NavLink>

            <NavLink
              to={`/college/${id}/administration`}
              className={linkClass}
            >
              Administration
            </NavLink>

            <NavLink
              to={`/college/${id}/students`}
              className={linkClass}
            >
              Students
            </NavLink>

            <NavLink
              to={`/college/${id}/faculty`}
              className={linkClass}
            >
              Faculty
            </NavLink>

            <NavLink
              to={`/college/${id}/admissions`}
              className={linkClass}
            >
              Admissions
            </NavLink>

          </div>

          {/* LANGUAGE */}

          <div className="hidden text-sm text-white/70 md:block">
            English
          </div>

        </div>
      </div>

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b border-[#D7E0EA] bg-[#EEF2F7] px-6 py-3">

        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-[#4B5566]">

          <Link
            to="/dashboard"
            className="font-semibold text-[#A66E1E] hover:underline"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to="/college"
            className="text-[#A66E1E] hover:underline"
          >
            Colleges
          </Link>

          <span>/</span>

          <span className="font-medium text-[#0b1b30]">
            {college.collegeName}
          </span>

        </div>

      </div>

      {/* =====================================================
          COLLEGE HEADER
      ===================================================== */}

      <section className="border-b border-[#D7E0EA] bg-[#FFFEFB]">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">

          {/* COLLEGE INFO */}

          <div className="flex items-center gap-5">

            <img
              src={college.logo || defaultLogo}
              alt={`${college.collegeName} logo`}
              className="h-20 w-20 rounded-lg border border-[#D7E0EA] bg-white object-cover shadow-sm"
            />

            <div>

              <p className="mb-1 font-mono-num text-[11px] uppercase tracking-[0.2em] text-[#A66E1E]">
                Institution
              </p>

              <h1 className="font-display text-2xl font-bold text-[#0b1b30] md:text-3xl">
                {college.collegeName}
              </h1>

              <p className="mt-1 text-sm text-[#4B5566]">
                {college.address || "Address not available"}
              </p>

            </div>

          </div>

          {/* BACK BUTTON */}

          <button
            onClick={() => navigate("/college")}
            className="self-start rounded-md border border-[#D7E0EA] bg-white px-4 py-2 text-sm font-semibold text-[#132A46] transition hover:bg-[#EEF2F7] md:self-auto"
          >
            ← Back to Colleges
          </button>

        </div>

      </section>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-[#FBF3E2]">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center">

          {/* HERO TEXT */}

          <div className="flex-1">

            <p className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#A66E1E]">
              Welcome to
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold text-[#0b1b30] md:text-4xl">
              {college.collegeName}
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-[#4B5566]">
              Explore academic programs, administration, student life,
              faculty information, and admission opportunities.
            </p>

            <button
              onClick={() => navigate(`/apply/${id}`)}
              className="mt-6 rounded-md bg-[#132A46] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#0b1b30]"
            >
              Apply Now
            </button>

          </div>

          {/* HERO IMAGE */}

          <div className="w-full md:w-[380px]">

            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585"
              alt="College campus"
              className="h-56 w-full rounded-lg border border-[#D7E0EA] object-cover shadow-md"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK INFORMATION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-8">

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* EMAIL */}

          <div className="rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-5 shadow-sm">

            <p className="font-mono-num text-[11px] uppercase tracking-wider text-[#A66E1E]">
              Email
            </p>

            <p className="mt-2 break-all font-medium text-[#0b1b30]">
              {college.email || "Not available"}
            </p>

          </div>

          {/* PHONE */}

          <div className="rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-5 shadow-sm">

            <p className="font-mono-num text-[11px] uppercase tracking-wider text-[#A66E1E]">
              Phone
            </p>

            <p className="mt-2 font-medium text-[#0b1b30]">
              {college.phone || "Not available"}
            </p>

          </div>

          {/* COURSE */}

          <div className="rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-5 shadow-sm">

            <p className="font-mono-num text-[11px] uppercase tracking-wider text-[#A66E1E]">
              Course
            </p>

            <p className="mt-2 font-medium text-[#0b1b30]">
              {college.course || "Not available"}
            </p>

          </div>

          {/* DISTRICT */}

          <div className="rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-5 shadow-sm">

            <p className="font-mono-num text-[11px] uppercase tracking-wider text-[#A66E1E]">
              District
            </p>

            <p className="mt-2 font-medium text-[#0b1b30]">
              {college.district || "Not available"}
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          CHILD PAGE
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 pb-10">

        <div className="rounded-lg border border-[#D7E0EA] bg-[#FFFEFB] p-6 shadow-sm">

          <Outlet />

        </div>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <CollegeFooter />

    </div>
  );
}

export default CollegeDetails;