import { useNavigate } from "react-router-dom";
import CollegeFooter from "../components/CollegeFooter";

function Eligibility() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF6EE]">

      {/* HEADER */}
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">
            Eligibility Criteria
          </h1>

          <p className="mt-2 text-white/80">
            Admission eligibility and requirements
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-[1200px] px-6 py-10">

        <div className="rounded-xl bg-white p-6 shadow-md">

          <h2 className="mb-4 text-2xl font-bold text-[#252ba8]">
            Eligibility Criteria
          </h2>

          <p className="mb-6 leading-7 text-gray-700">
            Candidates seeking admission to the college must satisfy the
            eligibility criteria prescribed for the respective course.
          </p>

          <div className="space-y-4">

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-[#252ba8]">
                Undergraduate Courses
              </h3>

              <p className="mt-2 text-gray-600">
                Candidates must have passed the required qualifying
                examination from a recognized board or institution.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-[#252ba8]">
                Postgraduate Courses
              </h3>

              <p className="mt-2 text-gray-600">
                Candidates must hold the required bachelor's degree
                with the prescribed marks or qualification.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-[#252ba8]">
                Important Note
              </h3>

              <p className="mt-2 text-gray-600">
                Eligibility requirements may vary depending on the course.
                Candidates should check the official admission notification
                before applying.
              </p>
            </div>

          </div>
        </div>

      </main>

      <CollegeFooter />

    </div>
  );
}

export default Eligibility;