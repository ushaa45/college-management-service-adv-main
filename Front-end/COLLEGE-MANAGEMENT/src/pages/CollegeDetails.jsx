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
import DropdownNav from "../components/DropdownNav";

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
  // SCROLL TOP
  // ==============================

  useEffect(() => {
    if (location.hash) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.hash]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] p-6">
        <div className="animate-pulse">
          <div className="mb-4 h-32 rounded bg-gray-300" />
          <div className="mb-4 h-10 rounded bg-gray-300" />
          <div className="mb-4 h-72 rounded bg-gray-300" />
          <div className="h-40 rounded bg-gray-300" />
        </div>
      </div>
    );
  }

  // ==============================
  // NOT FOUND
  // ==============================

  if (!college) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-[#182b72]">
            College not found
          </h1>

          <p className="mb-5 text-gray-600">
            We couldn't find the requested college.
          </p>

          <button
            onClick={() => navigate("/college")}
            className="bg-[#182b72] px-5 py-2.5 font-semibold text-white hover:bg-[#101e55]"
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
    `border-r border-white/40 px-3 py-2 text-sm transition ${isActive
      ? "bg-[#101e55] font-semibold text-[#ffd21c]"
      : "text-white hover:bg-[#101e55] hover:text-[#ffd21c]"
    }`;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* =====================================================
          TOP COLLEGE HEADER
      ===================================================== */}

      <header className="bg-[#252ba8] text-white">

        <div className="mx-auto flex max-w-[1400px] flex-col px-6 py-3 lg:flex-row lg:items-start lg:justify-between">

          {/* LOGO + COLLEGE NAME */}

          <div className="flex items-start gap-4">

            <img
              src={college.logo || defaultLogo}
              alt={`${college.collegeName} logo`}
              className="h-24 w-24 object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold tracking-wide text-[#ffd21c] md:text-4xl">
                {college.collegeName}
              </h1>

              <p className="mt-1 text-lg font-semibold text-[#ffd21c]">
                NAAC Accredited Institution
              </p>

              <p className="text-lg">
                Affiliated to University
              </p>

              <p className="text-base">
                Estd. 1988
              </p>
            </div>

          </div>

          {/* TOP LINKS + SEARCH */}

          <div className="mt-4 lg:mt-0">

            <div className="mb-4 flex flex-wrap justify-end gap-3 text-xs">
              <span>
                <span className="text-red-500">LIVE</span>{" "}
                Admission: 2026-2027
              </span>

              <span>
                <span className="text-red-500">LIVE</span>{" "}
                Online Fees Payment
              </span>

              <span>
                <span className="text-red-500">LIVE</span>{" "}
                Academic Information
              </span>
            </div>

            <div className="flex justify-end">
              <input
                type="text"
                placeholder="Search"
                className="h-8 w-48 border border-gray-300 bg-white px-2 text-sm text-black outline-none"
              />

              <button className="ml-1 h-8 border border-white bg-gray-100 px-3 text-sm text-black hover:bg-white">
                Search
              </button>
            </div>

          </div>
        </div>
      </header>


      {/* =====================================================
          ANNOUNCEMENT BUTTONS
      ===================================================== */}

      <section className="border-b border-gray-300 bg-white py-4">

        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2 px-4">

          <button className="rounded-md bg-[#a9d0e2] px-6 py-2.5 text-sm font-semibold text-white shadow-sm">
            Admission Notification 2026-2027
          </button>

          <button className="rounded-md bg-[#a9d0e2] px-6 py-2.5 text-sm font-semibold text-white shadow-sm">
            Hostel Admission 2026
          </button>

        </div>

      </section>


      {/* =====================================================
          NEWS TICKER
      ===================================================== */}

      <section className="mx-auto flex max-w-5xl overflow-hidden bg-[#183c72] text-white">

        <div className="flex shrink-0 items-center bg-black px-7 py-3 text-sm font-semibold">
          What's new
        </div>

        <div className="relative flex-1 overflow-hidden py-3">
          <div className="animate-marquee text-sm">
            📢 Admission notification for the academic session 2026-2027
            &nbsp;&nbsp;&nbsp;&nbsp; ✨ New admission opportunities available
            &nbsp;&nbsp;&nbsp;&nbsp; 📚 Academic programmes and facilities
            &nbsp;&nbsp;&nbsp;&nbsp; 🎓 Apply now for admission
            &nbsp;&nbsp;&nbsp;&nbsp; 📢 Important college notice
          </div>
        </div>

      </section>


      {/* =====================================================
          MAIN NAVIGATION
      ===================================================== */}

      <nav className="bg-[#252ba8] text-white shadow-md">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-center">

          <DropdownNav
            id={id}
            label="About"
            items={[
              { label: "Overview", path: "about" },
              { label: "Vission & Mission", path: "about#vision-mission" },
              { label: "Objectives", path: "about#objectives" },
            ]}
          />

          <DropdownNav
            id={id}
            label="Administration"
            items={[
              { label: "Principal", path: "administration/principal" },
              { label: "Governing Body", path: "administration/governing-body" },
              { label: "Departments", path: "administration/departments" },
            ]}
          />

          <DropdownNav
            id={id}
            label="Students"
            items={[
              { label: "Student Information", path: "students" },
              { label: "Student Notice", path: "students/notices" },
              { label: "Scholarship", path: "students/scholarship" },
            ]}
          />

          <DropdownNav
            id={id}
            label="Faculty"
            items={[
              { label: "Faculty List", path: "faculty" },
              { label: "Departments", path: "faculty/departments" },
            ]}
          />

          <DropdownNav
            id={id}
            label="Admissions"
            items={[
              { label: "Courses", path: "admissions/courses" },
              { label: "Eligibility", path: "admissions/eligibility" },
              { label: "Apply Online", path: "admissions/apply" },
            ]}
          />

          <a
            href="https://www.haldiagovtcollege.ac.in/academics/"
            className="border-r border-white/40 px-3 py-2 text-sm hover:bg-[#101e55] hover:text-[#ffd21c]"
          >
            Academics
          </a>

          <DropdownNav
            id={id}
            label="Facilities"
            items={[
              { label: "Library", path: "facilities/library" },
              { label: "Hostel", path: "facilities/hostel" },
              { label: "Laboratories", path: "facilities/laboratories" },
              { label: "Sports", path: "facilities/sports" },
            ]}
          />

          <NavLink
            to={`/college/${id}/contact`}
            className={linkClass}
          >
            Contact
          </NavLink>

        </div>
      </nav>


      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b border-gray-300 bg-[#eef1f7] px-6 py-3">

        <div className="mx-auto max-w-7xl text-xs text-gray-600">

          <Link
            to="/dashboard"
            className="font-semibold text-[#b27600] hover:underline"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/college"
            className="text-[#b27600] hover:underline"
          >
            Colleges
          </Link>

          <span className="mx-2">/</span>

          <span className="font-semibold text-[#182b72]">
            {college.collegeName}
          </span>

        </div>

      </div>


      {/* =====================================================
          COLLEGE TITLE
      ===================================================== */}

      <section className="border-b border-gray-300 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">

          <div className="flex items-center gap-5">

            <img
              src={college.logo || defaultLogo}
              alt={`${college.collegeName} logo`}
              className="h-20 w-20 object-contain"
            />

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-[#a66e00]">
                Institution
              </p>

              <h2 className="text-3xl font-bold text-[#182b72]">
                {college.collegeName}
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                {college.address || "Address not available"}
              </p>

            </div>

          </div>

          <button
            onClick={() => navigate("/college")}
            className="hidden border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#182b72] hover:bg-gray-100 md:block"
          >
            ← Back to Colleges
          </button>

        </div>

      </section>


      {/* =====================================================
          LARGE HERO
      ===================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-[1400px]">

          <div className="relative h-[300px] overflow-hidden md:h-[430px]">

            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585"
              alt="College campus"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-end">

              <div className="w-full bg-gradient-to-t from-black/80 to-transparent px-8 pb-8 pt-20 text-white">

                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#ffd21c]">
                  Welcome to
                </p>

                <h2 className="text-3xl font-bold md:text-5xl">
                  {college.collegeName}
                </h2>

                <p className="mt-2 text-base md:text-lg">
                  Excellence in education, knowledge and student development
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          APPLY BUTTON
      ===================================================== */}

      <div className="border-b border-gray-300 bg-white py-5 text-center">

        <button
          onClick={() => navigate(`/apply/${id}`)}
          className="bg-[#252ba8] px-8 py-3 font-semibold text-white shadow-md transition hover:bg-[#101e55]"
        >
          Apply Now
        </button>

      </div>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      {/* <section className="bg-white py-10">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-5 border-b border-gray-300 pb-3 text-2xl font-bold text-[#182b72]">
            About
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="md:col-span-2">

              <p className="leading-7 text-gray-700">
                {college.collegeName} is committed to providing quality
                education and creating opportunities for students to develop
                academically, professionally and personally.
              </p>

              <p className="mt-4 leading-7 text-gray-700">
                The institution focuses on academic excellence, student
                development, modern learning practices and creating a strong
                educational environment.
              </p>

            </div>

            <div className="border border-gray-300 bg-[#f5f7fb] p-5">

              <h3 className="mb-4 border-b border-gray-300 pb-2 font-bold text-[#182b72]">
                College Information
              </h3>

              <p className="mb-2 text-sm">
                <strong>District:</strong>{" "}
                {college.district || "Not available"}
              </p>

              <p className="mb-2 text-sm">
                <strong>Course:</strong>{" "}
                {college.course || "Not available"}
              </p>

              <p className="mb-2 break-all text-sm">
                <strong>Email:</strong>{" "}
                {college.email || "Not available"}
              </p>

              <p className="text-sm">
                <strong>Phone:</strong>{" "}
                {college.phone || "Not available"}
              </p>

            </div>

          </div>

        </div>

      </section> */}

      <section className="bg-white py-10">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-6 border-b border-gray-300 pb-3 text-2xl font-bold text-[#182b72]">
            About
          </h2>

          <div className="grid gap-7 md:grid-cols-3">

            {/* OBJECTIVES */}

            <div className="border border-gray-300 bg-blue-100 p-6">

              <h3 className="mb-3 text-xl font-bold text-[#182b72]">
                Objectives
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.objectives ||
                  "Objectives information is not available."}
              </p>

            </div>


            {/* VISION */}

            <div className="border border-gray-300 bg-purple-50 p-6">

              <h3 className="mb-3 text-xl font-bold text-[#182b72]">
                Vision
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.vision ||
                  "Vision information is not available."}
              </p>

            </div>


            {/* MISSION */}

            <div className="border border-gray-300 bg-orange-50 p-6">

              <h3 className="mb-3 text-xl font-bold text-[#182b72]">
                Mission
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.mission ||
                  "Mission information is not available."}
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-[#f7f7f7] py-10">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-6 md:grid-cols-3">

            {/* LIBRARY */}

            <div className="border border-gray-300 bg-yellow-100 p-6">

              <h3 className="mb-3 text-2xl font-bold text-[#182b72]">
                Library
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.libraryInfo ||
                  "Library information is not available."}
              </p>

            </div>


            {/* SCHOLARSHIP */}

            <div className="border border-gray-300 bg-green-100 p-6">

              <h3 className="mb-3 text-2xl font-bold text-[#182b72]">
                Scholarship
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.scholarshipInfo ||
                  "Scholarship information is not available."}
              </p>

            </div>


            {/* ALUMNI */}

            <div className="border border-gray-300 bg-blue-100 p-6">

              <h3 className="mb-3 text-2xl font-bold text-[#182b72]">
                Alumni
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.alumniInfo ||
                  "Alumni information is not available."}
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-white py-8">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-5 md:grid-cols-3">

            {/* NOTICE */}

            <div className="bg-[#183c72] p-5 text-white">

              <h3 className="mb-4 border-b border-white/60 pb-2 text-lg font-bold">
                Notice
              </h3>

              <p className="whitespace-pre-line text-sm leading-6">
                {college.notice ||
                  "No notice available."}
              </p>

            </div>


            {/* GENERAL NOTICE */}

            <div className="bg-[#246b6d] p-5 text-white">

              <h3 className="mb-4 border-b border-white/60 pb-2 text-lg font-bold">
                General Notice
              </h3>

              <p className="whitespace-pre-line text-sm leading-6">
                {college.generalNotice ||
                  "No general notice available."}
              </p>

            </div>


            {/* TENDER */}

            <div className="bg-[#20643b] p-5 text-white">

              <h3 className="mb-4 border-b border-white/60 pb-2 text-lg font-bold">
                Tender
              </h3>

              <p className="whitespace-pre-line text-sm leading-6">
                {college.tender ||
                  "No tender information available."}
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-white py-10">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <h3 className="mb-4 text-lg font-bold text-[#182b72]">
                Regular Courses
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.regularCourses ||
                  "Course information is not available."}
              </p>
            </div>


            <div>
              <h3 className="mb-4 text-lg font-bold text-[#182b72]">
                Student Zone
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.studentZone ||
                  "Student zone information is not available."}
              </p>
            </div>


            <div>
              <h3 className="mb-4 text-lg font-bold text-[#182b72]">
                Quick Links
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {college.quickLinks ||
                  "Quick links are not available."}
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ACADEMICS / FACILITIES
      ===================================================== */}

      <section
        id="academics"
        className="border-y border-gray-300 bg-[#f7f7f7] py-10"

      >

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-8 border-b border-gray-300 pb-3 text-2xl font-bold text-[#182b72]">
            Academics
          </h2>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="border border-gray-300 bg-yellow-100 p-6">
              <h3 className="mb-2 font-bold text-[#182b72]">
                Academic Programmes
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Explore academic courses and programmes offered by the
                institution.
              </p>
            </div>

            <div className="border border-gray-300 bg-green-100 p-6">
              <h3 className="mb-2 font-bold text-[#182b72]">
                Faculty
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Meet experienced faculty members and explore their academic
                departments.
              </p>
            </div>

            <div
              id="facilities"
              className="border border-gray-300 bg-blue-100 p-6"
            >
              <h3 className="mb-2 font-bold text-[#182b72]">
                Facilities
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Libraries, laboratories, classrooms and other student
                facilities.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CHILD ROUTES
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="border border-gray-300 bg-white p-6">

          <Outlet />

        </div>

      </main> 


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="bg-[#182b72] py-10 text-white"
      >

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="mb-5 text-2xl font-bold">
            Contact Us
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div>
              <p className="text-sm text-white/60">Address</p>
              <p className="mt-1">
                {college.address || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-white/60">Email</p>
              <p className="mt-1 break-all">
                {college.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-white/60">Phone</p>
              <p className="mt-1">
                {college.phone || "Not available"}
              </p>
            </div>
            {/* OFFICIAL WEBSITE */}
            <div>
              <p className="text-sm text-white/60">Website</p>

              {college.websiteUrl ? (
                <a
                  href={college.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[#ffd21c] hover:underline"
                >
                  Official Website ↗
                </a>
              ) : (
                <p className="mt-1">
                  Not available
                </p>
              )}
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <CollegeFooter />

    </div>
  );
}

export default CollegeDetails;