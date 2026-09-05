import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { IconUpload } from "../components/ui/Icons";


function College() {
  const [logo, setLogo] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    collegeName: "",
    address: "",
    email: "",
    phone: "",
    course: "",
    district: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState({ role: "USER" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.sub, role: decoded.role || "USER" });
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

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
    setErrors({});

    if (!form.collegeName || !form.email || !form.address || !form.phone || !form.course || !form.district) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("collegeName", form.collegeName);
      formData.append("address", form.address);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("course", form.course);
      formData.append("district", form.district);
      if (logo) formData.append("logo", logo);

      if (editingId) {
        await API.put(`/api/college/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/api/college/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ collegeName: "", address: "", email: "", phone: "", course: "", district: "" });
      setLogo(null);
      setEditingId(null);
      fetchColleges();
    } catch (err) {
      console.error("Full error:", err);
      if (err.response) {
        if (err.response.status === 403) {
          alert("Access Denied: You are not authorized.");
        } else if (Array.isArray(err.response.data)) {
          const validationErrors = {};
          err.response.data.forEach((e) => {
            validationErrors[e.field] = e.defaultMessage;
          });
          setErrors(validationErrors);
        } else {
          alert(err.response.data.message || "Server error");
        }
      } else {
        alert("Network error. Backend not reachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteCollege = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this college? This action cannot be undone.");
    if (!confirmDelete) return;

    if(!id){
      console.error("College ID is required to delete a college.");
      return;
    } 
    try {
      await API.delete(`/api/college/${id}`);
      fetchColleges();
    } catch (err) {
      console.error(err);
    }
  }

  const editCollege = (college) => {
    setForm({
      collegeName: college.collegeName,
      address: college.address,
      email: college.email,
      phone: college.phone,
      course: college.course,
      district: college.district,
    });
    const id = college.collegeId || college.id || college.college_id;
    setEditingId(id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ collegeName: "", address: "", email: "", phone: "", course: "", district: "" });
    setErrors({});
  };

  const inputClass = (field) =>
    `w-full rounded-md border bg-[#FFFEFB] px-3 py-2 text-sm text-[#0b1b30] outline-none transition focus:ring-2 focus:ring-[#C88A2E]/30 ${
      errors[field] ? "border-[#B4472E]" : "border-[#D7E0EA] focus:border-[#C88A2E]"
    }`;

  return (
    <div>
      <PageHeader
        eyebrow="Registry"
        title="Colleges"
        description="Every institution on file, indexed and searchable."
        action={
          <Badge tone={user.role === "ADMIN" ? "gold" : "ink"}>
            {user.role === "ADMIN" ? "Admin" : "User"}
          </Badge>
        }
      />

      {user.role === "ADMIN" && (
        <Card spine="gold" className="mb-6 p-6">
          <h3 className="font-display mb-4 text-lg font-semibold text-[#0b1b30]">
            {editingId ? "Update college" : "Add a college"}
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <input
                className={inputClass("collegeName")}
                placeholder="College name"
                value={form.collegeName}
                onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
              />
              {errors.collegeName && <p className="mt-1 text-xs text-[#B4472E]">{errors.collegeName}</p>}
            </div>

            <div>
              <input
                className={inputClass("address")}
                placeholder="Location"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div>
              <input
                className={inputClass("email")}
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="mt-1 text-xs text-[#B4472E]">{errors.email}</p>}
            </div>

            <div>
              <input
                className={inputClass("phone")}
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <p className="mt-1 text-xs text-[#B4472E]">{errors.phone}</p>}
            </div>

            <div>
              <input
                className={inputClass("course")}
                placeholder="Course"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              />
              {errors.course && <p className="mt-1 text-xs text-[#B4472E]">{errors.course}</p>}
            </div>

            <div>
              <input
                className={inputClass("district")}
                placeholder="District"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
              />
              {errors.district && <p className="mt-1 text-xs text-[#B4472E]">{errors.district}</p>}
            </div>

            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-[#D7E0EA] bg-[#EEF2F7] px-3 py-2 text-sm text-[#4B5566] transition hover:border-[#C88A2E]">
              <IconUpload />
              {logo ? logo.name : "Upload logo"}
              <input type="file" className="hidden" onChange={(e) => setLogo(e.target.files[0])} />
            </label>

            <div className="flex gap-2 md:col-span-1">
              <Button variant="accent" onClick={handleSubmit} disabled={loading} className="flex-1">
                {loading ? "Saving…" : editingId ? "Update" : "Add college"}
              </Button>
              {editingId && (
                <Button variant="ghost" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden !pl-0" spine="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-ledger-rule bg-[#EEF2F7] font-mono-num text-xs uppercase tracking-wide text-[#4B5566]">
            <tr>
              <th className="p-3 pl-5">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Course</th>
              <th className="p-3">District</th>
              {user.role === "ADMIN" && (
                <th className="p-3 pr-5 text-right">Actions</th>
              )}  
            </tr>
          </thead>
          <tbody>
            {colleges.map((c) => (
              <tr
                key={c.collegeId}
                className="cursor-pointer border-t border-[#EEF2F7] transition hover:bg-[#FBF3E2]/40"
                onClick={() => navigate(`/college/${c.collegeId}`)}
              >
                <td className="p-3 pl-5 font-medium text-[#0b1b30]">{c.collegeName}</td>
                <td className="p-3 text-[#4B5566]">{c.address}</td>
                <td className="p-3 text-[#4B5566]">{c.email}</td>
                <td className="p-3 font-mono-num text-[#4B5566]">{c.phone}</td>
                <td className="p-3 text-[#4B5566]">{c.course}</td>
                <td className="p-3 text-[#4B5566]">{c.district}</td>
                {user.role === "ADMIN" && (
                <td className="p-3 pr-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="!px-3 !py-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        editCollege(c);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="!px-3 !py-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCollege(c.collegeId);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {colleges.length === 0 && (
          <EmptyState
            title="No colleges on record yet"
            description="Add your first college above to start building the registry."
          />
        )}
      </Card>

      <div className="mt-5 flex items-center justify-center gap-4">
        <Button variant="ghost" disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <span className="font-mono-num text-sm text-[#4B5566]">
          Page {page + 1} / {totalPages || 1}
        </span>
        <Button variant="ghost" disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default College;
