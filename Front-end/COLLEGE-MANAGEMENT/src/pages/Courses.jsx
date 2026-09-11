import CollegeFooter from "../components/CollegeFooter";

function Courses() {
  const courses = [
    "Bachelor of Arts",
    "Bachelor of Science",
    "Bachelor of Commerce",
    "Master's Degree Programs",
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="mt-2 text-white/80">
            Courses and academic programs
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#252ba8] font-bold text-white">
                {index + 1}
              </div>

              <h2 className="text-xl font-bold text-[#252ba8]">
                {course}
              </h2>

              <p className="mt-3 text-gray-600">
                Explore course structure, eligibility, duration,
                departments, and admission information.
              </p>
            </div>
          ))}
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default Courses;