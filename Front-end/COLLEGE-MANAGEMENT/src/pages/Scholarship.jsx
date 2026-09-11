import CollegeFooter from "../components/CollegeFooter";

function Scholarship() {
  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Scholarship</h1>
          <p className="mt-2 text-white/80">
            Scholarship opportunities for students
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            "Government Scholarships",
            "Merit Scholarship",
            "Minority Scholarship",
            "Financial Assistance",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-[#252ba8]">
                {item}
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Information regarding eligibility, application process,
                required documents, and important dates will be provided
                here.
              </p>

              <button className="mt-4 font-semibold text-[#252ba8] hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default Scholarship;