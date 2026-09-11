import CollegeFooter from "../components/CollegeFooter";

function GoverningBody() {
  const members = [
    {
      name: "Chairperson",
      role: "Governing Body",
    },
    {
      name: "Principal",
      role: "Member Secretary",
    },
    {
      name: "Teacher Representative",
      role: "Member",
    },
    {
      name: "Government Representative",
      role: "Member",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <section className="bg-[#252ba8] px-6 py-10 text-white">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="text-3xl font-bold">Governing Body</h1>
          <p className="mt-2 text-white/80">
            Institutional governing body
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#252ba8] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Name / Position</th>
                  <th className="px-6 py-4 text-left">Role</th>
                </tr>
              </thead>

              <tbody>
                {members.map((member, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium">
                      {member.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {member.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <CollegeFooter />
    </div>
  );
}

export default GoverningBody;