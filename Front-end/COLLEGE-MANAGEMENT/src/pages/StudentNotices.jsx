import CollegeFooter from "../components/CollegeFooter";

function StudentNotices() {
  const notices = [
    "Admission related notice",
    "Examination schedule",
    "Academic calendar",
    "Scholarship notification",
    "Student registration notice",
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Student Notices</h1>
          <p className="mt-2 text-white/80">
            Latest notices and announcements
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="rounded-xl bg-white shadow-md">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-200 px-6 py-5 last:border-0"
            >
              <div>
                <span className="mr-3 rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                  NEW
                </span>

                <span className="text-gray-700">
                  {notice}
                </span>
              </div>

              <button className="text-sm font-semibold text-[#252ba8] hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default StudentNotices;