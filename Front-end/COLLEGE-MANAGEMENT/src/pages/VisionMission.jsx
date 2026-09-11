import CollegeFooter from "../components/CollegeFooter";

function VisionMission() {
  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Vision & Mission</h1>
          <p className="mt-2 text-white/80">
            Our vision and mission
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-[#252ba8]">
              Our Vision
            </h2>

            <p className="leading-7 text-gray-700">
              To provide quality education and create an environment that
              encourages academic excellence, innovation, character building,
              and responsible citizenship.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-[#252ba8]">
              Our Mission
            </h2>

            <p className="leading-7 text-gray-700">
              Our mission is to empower students with knowledge, skills,
              values, and opportunities that prepare them for higher
              education, professional careers, and meaningful contribution
              to society.
            </p>
          </div>
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default VisionMission;