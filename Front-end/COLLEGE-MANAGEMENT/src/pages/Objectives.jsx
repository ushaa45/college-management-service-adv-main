import CollegeFooter from "../components/CollegeFooter";

function Objectives() {
  const objectives = [
    "Provide quality and accessible education.",
    "Encourage academic excellence and research.",
    "Develop professional and practical skills among students.",
    "Promote innovation, creativity, and critical thinking.",
    "Build strong ethical and social values.",
    "Encourage participation in sports and cultural activities.",
    "Prepare students for higher education and professional careers.",
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Objectives</h1>
          <p className="mt-2 text-white/80">
            Our institutional objectives
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-[#252ba8]">
            Our Objectives
          </h2>

          <div className="space-y-4">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-lg border border-gray-200 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#252ba8] font-semibold text-white">
                  {index + 1}
                </span>

                <p className="leading-7 text-gray-700">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default Objectives;