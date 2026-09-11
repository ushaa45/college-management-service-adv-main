import CollegeFooter from "../components/CollegeFooter";

function FacultyDepartments() {
  const departments = [
    "Department of Arts",
    "Department of Science",
    "Department of Commerce",
    "Department of Computer Science",
    "Department of Mathematics",
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="mt-2 text-white/80">
            Academic departments and faculty
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="divide-y divide-gray-200">
            {departments.map((department, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-5"
              >
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {department}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Faculty members, courses and department information
                  </p>
                </div>

                <span className="text-xl text-[#252ba8]">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default FacultyDepartments;