import { useEffect, useState } from "react";
import API from "../api/axios";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { IconSearch } from "../components/ui/Icons";

function Library() {
  const [libraries, setLibraries] = useState([]);
  const [form, setForm] = useState({
    libraryName: "",
    collegeId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchLibraries = async () => {
    try {
      const res = await API.get("/api/libraries");
      console.log("Libraries:", res.data);
      setLibraries(res.data);
    } catch (err) {
      console.error("Error fetching libraries: " + err);
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  const handleSubmit = async () => {
    if (!form.libraryName || !form.collegeId){
      alert("Please enter library name and college ID");
      return;
    } 
    try {
      if (editingId) {
        await API.put(`/api/libraries/${editingId}`,{
          libraryName: form.libraryName,
          collegeId: form.collegeId 
        });
        setEditingId(null);
      } else {
        await API.post("/api/libraries",{
          libraryName: form.libraryName,
          collegeId: form.collegeId 
        });
      }
      setForm({ libraryName: "", collegeId: "" });
      fetchLibraries();
    } catch (err) {
      console.error("Error saving library:", err);
    }
  };

  const deleteLibrary = async (id) => {
    try {
      await API.delete(`/api/libraries/${id}`);
      fetchLibraries();
    } catch (err) {
      console.error("Error deleting library:",err);
    }
  };

  const editLibrary = (lib) => {
    setForm({ libraryName: lib.libraryName, collegeId: lib.collegeId });
    setEditingId(lib.libraryId);
  };

  // Search by college ID
  const filtered = libraries.filter((l) =>
    String(l.collegeId)
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const inputClass =
    "rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30";

  return (
    <div>
      <PageHeader eyebrow="Library" 
      title="Library cards" 
      description="Members indexed by their college ID." />

      <div className="relative mb-6 max-w-md">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5566]" />
        <input
          type="text"
          placeholder="Search by college ID…"
          className={`${inputClass} w-full pl-9`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card spine="sage" className="mb-6 p-6">
        <h3 className="font-display mb-4 text-lg font-semibold text-[#0b1b30]">
            {editingId ? "Update library card" : "Add library card"}
        </h3>

        <div className="flex flex-wrap gap-3">
          <input className={`${inputClass} w-60`} 
          placeholder="Library name" 
          value={form.libraryName} 
          onChange={(e) => 
            setForm({ 
              ...form, 
              libraryName: e.target.value 
              })
            } 
          />
          
          <input className={`${inputClass} w-60`} 
                  placeholder="College ID" 
                  value={form.collegeId} 
                  onChange={(e) => 
                    setForm({ ...form, collegeId: e.target.value })} />

          <Button variant="accent" onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden !pl-0" spine="none">
        <table className="w-full text-center text-sm">
          <thead className="bg-[#EEF2F7] font-mono-num text-xs uppercase tracking-wide text-[#4B5566]">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">College ID</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-[#EEF2F7] hover:bg-[#E9F1EC]/40">
                <td className="p-3 font-medium text-[#0b1b30]">{l.libraryName}</td>
                <td className="p-3 font-mono-num text-[#4B5566]">{l.collegeId}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" className="!px-3 !py-1 text-xs" onClick={() => editLibrary(l)}>
                    Edit
                  </Button>
                  <Button variant="danger" className="!px-3 !py-1 text-xs" onClick={() => deleteLibrary(l.libraryId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <EmptyState 
            title="No data found" 
            description="Add a library card above, or adjust your search." />
        )}
      </Card>
    </div>
  );
}

export default Library;
