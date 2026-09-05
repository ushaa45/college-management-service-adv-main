import { useEffect, useState } from "react";
import API from "../api/axios";

function Gen_College() {
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    collegeName: "",
    address: "",
    email: "",
    phone: ""
  });

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const fetchColleges = async () => {
    try {
      const res = await API.get(`/api/college/pagination?page=${page}&size=${size}`);
      setColleges(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [page]);

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await API.put(`/api/college/${editingId}`, form);
        setEditingId(null);
      } else {
        await API.post("/api/college", form);
      }
      setForm({ collegeName: "", address: "", email: "", phone: "" });
      fetchColleges();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCollege = async (id) => {
    await API.delete(`/api/college/${id}`);
    fetchColleges();
  };

  const editCollege = (c) => {
    setForm(c);
    setEditingId(c.id);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔷 HEADER */}
      <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Haldia Government College</h1>
          <p className="text-sm">NAAC Accredited Grade 'A' College</p>
        </div>

        <div className="space-x-3">
          <span className="bg-red-500 px-2 py-1 text-xs rounded">LIVE Admission</span>
          <span className="bg-red-500 px-2 py-1 text-xs rounded">LIVE Fees</span>
        </div>
      </div>

      {/* 🔷 NOTICE BAR */}
      <div className="bg-blue-800 text-white px-6 py-2 overflow-hidden">
        <marquee>
          📢 Notice for PG Sem 2 Admission Fees | 📢 PG Sem 4 Exam Fees Notice
        </marquee>
      </div>

      {/* 🔷 NAVBAR */}
      <div className="bg-blue-700 text-white flex gap-6 px-6 py-3 text-sm">
        <span className="cursor-pointer hover:underline">Home</span>
        <span className="cursor-pointer hover:underline">Administration</span>
        <span className="cursor-pointer hover:underline">Academics</span>
        <span className="cursor-pointer hover:underline">Departments</span>
        <span className="cursor-pointer hover:underline">Library</span>
        <span className="cursor-pointer hover:underline">Contact</span>
      </div>

      {/* 🔷 HERO */}
      <div className="w-full h-[350px] bg-gray-300 flex items-center justify-center">
        <h2 className="text-3xl font-bold">College Banner</h2>
      </div>

      {/* 🔷 NOTICE CARDS */}
      <div className="grid md:grid-cols-3 gap-6 p-6">
        <div className="bg-blue-800 text-white p-5 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Notice</h2>
          <p>PG Sem 2 Admission Fees Notice...</p>
        </div>

        <div className="bg-teal-700 text-white p-5 rounded shadow">
          <h2 className="text-lg font-bold mb-3">General Notice</h2>
          <p>Important academic announcements...</p>
        </div>

        <div className="bg-green-700 text-white p-5 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Tender</h2>
          <p>Security Tender Notice 2025...</p>
        </div>
      </div>

      {/* 🔷 OBJECTIVES / VISION / MISSION */}
      <div className="grid md:grid-cols-3 gap-6 px-6 pb-6">
        <div className="bg-green-800 text-white p-5 rounded text-center">
          <h2 className="text-xl font-bold">Objectives</h2>
          <p className="mt-2 text-sm">Promote value-based education...</p>
        </div>

        <div className="bg-blue-800 text-white p-5 rounded text-center">
          <h2 className="text-xl font-bold">Vision</h2>
          <p className="mt-2 text-sm">Global leadership in education...</p>
        </div>

        <div className="bg-teal-800 text-white p-5 rounded text-center">
          <h2 className="text-xl font-bold">Mission</h2>
          <p className="mt-2 text-sm">Modern multidisciplinary education...</p>
        </div>
      </div>

      {/* 🔷 YOUR CRUD SECTION */}
      <div className="bg-white mx-6 p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Manage Colleges</h2>

        <div className="grid md:grid-cols-5 gap-3 mb-4">
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.collegeName}
            onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className={`text-white rounded ${
              editingId ? "bg-yellow-500" : "bg-blue-600"
            }`}
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        <table className="w-full text-center">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-100">
                <td className="p-2">{c.collegeName}</td>
                <td>{c.address}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    onClick={() => editCollege(c)}
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCollege(c.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔷 FOOTER */}
      <div className="bg-blue-900 text-white text-center py-4">
        © 2024 Haldia Government College | All Rights Reserved
      </div>
    </div>
  );
}

export default Gen_College;