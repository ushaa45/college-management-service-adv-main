import { useEffect, useState } from "react";
import API from "../api/axios";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";

function Hostel() {
  const [hostels, setHostels] = useState([]);
  const [form, setForm] = useState({ hostelName: "", collegeId: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/hostel");
      console.log("Hostels:", res.data);
      setHostels(res.data);
    } catch (err) {
      console.error("Error fetching hostels:", err);
      setError(err.response?.data?.message ||
        "Failed to fetch hostels. Please try again later.");
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const addHostel = async () => {
    if (!form.hostelName || !form.collegeId.trim()) {
      alert("Please enter hostel name and college ID");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await API.post("api/hostel", {
        hostelName: form.hostelName,
        collegeId: form.collegeId, 
      });

      setForm({ hostelName: "",
                collegeId: "",
              });

      await fetchHostels();
    } catch (err) {
      console.error("Error adding hostel:",err);
      setError(err.response?.data?.message ||
        "Failed to add hostel. Please try again later.");
    } finally {
      setSubmitting(false); 
    }
  };

  const [deletingId, setDeletingId] = useState(null);
  const deleteHostel = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hostel? This action cannot be undone.");
    if (!confirmDelete) return;

    if(!id){
      console.error("Hostel ID is required to delete a hostel.");
      return;
    } 
    try {
      setDeletingId(id);
      setError("");

      await API.delete(`api/hostel/${id}`);
      await fetchHostels();
    } catch (err) {
      console.error("Error deleting hostel:",err);
      setError(err.response?.data?.message ||
        "Failed to delete hostel. Please try again later.");
    } finally {
      setDeletingId(null);  
    }
  };

  const inputClass =
    "rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30";

  return (
    <div>
      <PageHeader eyebrow="Residence" title="Hostels" description="Blocks and their designations." />
    
      {/* Loading message */}
      {loading && (
        <div className="mb-4 rounded-md border border-[#D7E0EA] bg-[#EEF2F7] px-4 py-3 text-sm text-[#4B5566]">
          Loading hostels...
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 flex items-center justify-between rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>

          <Button
            variant="outline"
            className="!px-3 !py-1 text-xs"
            onClick={fetchHostels}
          >
            Retry
          </Button>
        </div>
      )}
      <Card spine="rust" className="mb-6 p-6">
        <h3 className="font-display mb-4 text-lg font-semibold text-[#0b1b30]">Add hostel</h3>
        <div className="flex flex-wrap gap-3">
          <input className={`${inputClass} w-60`} 
                  placeholder="Hostel name" 
                  value={form.hostelName} 
                  onChange={(e) => setForm({ ...form, hostelName: e.target.value })} />
          <input className={`${inputClass} w-60`} 
                placeholder="College ID" 
                value={form.collegeId} 
                onChange={(e) => setForm({ ...form, collegeId: e.target.value })} />
          <Button variant="accent" 
                  onClick={addHostel} 
                  disabled={submitting}>
            {submitting ? "Adding..." : "Add hostel"}
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden !pl-0" spine="none">
        <table className="w-full text-center text-sm">
          <thead className="bg-[#EEF2F7] font-mono-num text-xs uppercase tracking-wide text-[#4B5566]">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((h) => (
              <tr key={h.hostelId} className="border-t border-[#EEF2F7] hover:bg-[#FBEAE5]/40">
                <td className="p-3 font-medium text-[#0b1b30]">{h.hostelName}</td>
                <td className="p-3">
                  <Badge tone={h.type?.toLowerCase().includes("girl") ? "rust" : "ink"}>{h.collegeId}</Badge>
                </td>
                <td className="p-3">
                  <Button variant="danger" 
                          className="!px-3 !py-1 text-xs" 
                          onClick={() => deleteHostel(h.hostelId)}
                          disabled={deletingId === h.hostelId}>
                    {deletingId === h.hostelId ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hostels.length === 0 && (
          <EmptyState title="No hostel data found" 
                      description="Add a hostel block above to get started." />
        )}
      </Card>
    </div>
  );
}

export default Hostel;
