import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CollegeFooter from "../components/CollegeFooter";

function About() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      {/* HERO */}
      <div id="overview"  className="relative h-[380px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585"
          alt="campus"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b1b30]/55 text-center text-white">
          <p className="font-mono-num text-xs uppercase tracking-[0.25em] text-[#E9C77E]">
            Our Story
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold md:text-5xl">
            About Our Institution
          </h1>
          <p className="mt-3 text-white/70">
            Dedicated to excellence &amp; innovation
          </p>
        </div>
      </div>

      {/* TITLE */}
      <div className="py-12 text-center">
        <p className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#A66E1E]">
          Who we are
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold text-[#0b1b30]">
          About Us
        </h2>
      </div>

      {/* CONTENT */}
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 pb-16 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b"
          alt="building"
          className="rounded-lg border border-[#D7E0EA] shadow-sm"
        />

        <div>
          <h3 className="font-display mb-3 text-xl font-semibold text-[#0b1b30]">
            Dedicated to the service of the nation
          </h3>
          <p className="mb-4 leading-relaxed text-[#4B5566]">
            Our institution is committed to providing world-class education,
            fostering innovation, and building future leaders. We believe in
            academic excellence, research, and holistic development.
          </p>
          <p className="leading-relaxed text-[#4B5566]">
            With modern infrastructure, experienced faculty, and industry
            exposure, we ensure students are prepared for real-world
            challenges.
          </p>
        </div>
      </div>

      {/* VISION & MISSION */}
      <div
        id="vision-mission"
        className="border-y border-[#D7E0EA] bg-[#FFFEFB] px-6 py-14 scroll-mt-24"
      >
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-[#D7E0EA] border-t-4 border-t-[#C88A2E] bg-[#FAF6EE] p-6">
            <h3 className="font-display mb-3 text-xl font-semibold text-[#0b1b30]">
              Vision
            </h3>
            <p className="text-sm leading-relaxed text-[#4B5566]">
              To be a center of academic excellence that nurtures critical
              thinking, innovation, and lifelong learning.
            </p>
          </div>

          <div className="rounded-lg border border-[#D7E0EA] border-t-4 border-t-[#3F6653] bg-[#FAF6EE] p-6">
            <h3 className="font-display mb-3 text-xl font-semibold text-[#0b1b30]">
              Mission
            </h3>
            <p className="text-sm leading-relaxed text-[#4B5566]">
              To provide quality education, foster research, and build
              responsible citizens equipped for real-world challenges.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="objectives" className="border-y border-[#D7E0EA] bg-[#FFFEFB] px-6 py-14">
        <h2 className="font-display mb-10 text-center text-2xl font-semibold text-[#0b1b30]">
          Why choose us
        </h2>

        <div className="mx-auto grid max-w-5xl gap-6 text-center md:grid-cols-3">
          {[
            { title: "Quality education", desc: "Top-notch curriculum and academic excellence", tone: "border-t-[#C88A2E]" },
            { title: "Infrastructure", desc: "Modern labs, libraries, and smart classrooms", tone: "border-t-[#3F6653]" },
            { title: "Placements", desc: "Strong industry connections & placement support", tone: "border-t-[#B4472E]" },
          ].map((f) => (
            <div key={f.title} className={`rounded-lg border border-[#D7E0EA] ${f.tone} border-t-4 bg-[#FAF6EE] p-6`}>
              <h3 className="font-display mb-2 text-lg font-semibold text-[#0b1b30]">{f.title}</h3>
              <p className="text-sm text-[#4B5566]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0b1b30] py-14 text-center text-white">
        <h2 className="font-display mb-5 text-2xl font-semibold">
          Ready to start your journey?
        </h2>
        <button
          onClick={() => navigate("/")}
          className="rounded-md bg-[#C88A2E] px-6 py-2.5 font-semibold text-[#0b1b30] transition hover:bg-[#A66E1E]"
        >
          Explore colleges
        </button>
      </div>

      <CollegeFooter />
    </div>
  );
}

export default About;
