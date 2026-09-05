import { useEffect, useState } from "react";
import API from "../api/axios";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    collegeId: "",
  });

  const fetchStudents = async () => {
    try {
      const res = await API.get("/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!form.name || !form.email || !form.department || !form.phone || !form.collegeId) return;
    try {
      await API.post("/api/students", form);
      setForm({ name: "", email: "", department: "", phone: "", collegeId: "" });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30";

  return (
    <div>
      <PageHeader
        eyebrow="Roster"
        title="Students"
        description="Every enrolled student, indexed by roll number."
      />

      <Card spine="sage" className="mb-6 p-6">
        <h3 className="font-display mb-4 text-lg font-semibold text-[#0b1b30]">Add student</h3>
        <div className="grid gap-3 md:grid-cols-5">
          <input className={inputClass} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" className={inputClass} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className={inputClass} placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          <input className={inputClass} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className={inputClass} placeholder="College ID" value={form.collegeId} onChange={(e) => setForm({ ...form, collegeId: e.target.value })} />
        </div>
        <Button variant="accent" onClick={addStudent} className="mt-4">
          Add student
        </Button>
      </Card>

      <Card className="overflow-hidden !pl-0" spine="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EEF2F7] font-mono-num text-xs uppercase tracking-wide text-[#4B5566]">
            <tr>
              <th className="p-3 pl-5">Roll No.</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Phone</th>
              <th className="p-3 pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={s.studentId} className="border-t border-[#EEF2F7] hover:bg-[#E9F1EC]/40">
                <td className="p-3 pl-5 font-mono-num text-[#4B5566]">
                  {String(s.studentId).padStart(4, "0")}
                </td>
                <td className="p-3 font-medium text-[#0b1b30]">{s.name}</td>
                <td className="p-3 text-[#4B5566]">{s.email}</td>
                <td className="p-3 text-[#4B5566]">{s.department}</td>
                <td className="p-3 font-mono-num text-[#4B5566]">
                  {s.phone ? `••••${s.phone.slice(-4)}` : ""}
                </td>
                <td className="p-3 pr-5 text-right">
                  <Button variant="danger" className="!px-3 !py-1 text-xs" onClick={() => deleteStudent(s.studentId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <EmptyState title="No students found" description="Add your first student above to populate the roster." />
        )}
      </Card>
    </div>
  );
}

export default Students;
