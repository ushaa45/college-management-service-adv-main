import CollegeFooter from "../components/CollegeFooter";

function Principal() {
  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Principal's Desk</h1>
          <p className="mt-2 text-white/80">
            Message from the Principal
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="grid gap-8 md:grid-cols-[220px_1fr]">
            <div className="flex items-start justify-center">
              <div className="flex h-48 w-40 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                Principal Photo
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#252ba8]">
                Principal's Message
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Welcome to our institution. We are committed to providing
                students with quality education and a supportive academic
                environment.
              </p>

              <p className="mt-4 leading-8 text-gray-700">
                Our goal is to develop students who are academically strong,
                socially responsible, and prepared to meet the challenges of
                the future.
              </p>

              <p className="mt-6 font-semibold text-gray-800">
                Principal
              </p>
            </div>
          </div>
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default Principal;