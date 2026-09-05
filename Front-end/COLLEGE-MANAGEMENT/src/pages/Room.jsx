import { useEffect, useState } from "react";
import API from "../api/axios";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

function Room() {
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({ 
    roomNumber: "",
    capacity: "", 
    hostelId: "" });

  const [hostels, setHostels] = useState([]);

  const fetchHostels = async () => {
  try {
    const res = await API.get("/api/hostel");
    console.log("Hostels:", res.data);
    setHostels(res.data);
  } catch (err) {
    console.error("Error fetching hostels:", err);
  }
};

  const fetchRooms = async () => {
    try {
      const res = await API.get("/api/room");
      console.log("Rooms:", res.data);
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:",err);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchHostels();
  }, []);

  const addRoom = async () => {
    if (!form.roomNumber.trim() || 
        !form.capacity || 
        !form.hostelId) {
          alert("Please enter room number, capacity and hostel ID");
          return;
        }
        
    try {
      const data = {
        roomNumber: form.roomNumber,
        capacity: form.capacity,
        hostelId: form.hostelId
      };
      console.log("Adding room:", data);
      await API.post("/api/room", data);

      setForm({ roomNumber: "", capacity: "", hostelId: "" });

      await fetchRooms();
    } catch (err) {
      console.error("Error adding room:",err);

      if(err.response){
        console.error("Error response data:", err.response.data);
      }
    }
  };

  const deleteRoom = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room? This action cannot be undone.");   
    if (!confirmDelete) return;
    if(!id){
      console.error("Room ID is required to delete a room.");
      return;
    }
    try {
      await API.delete(`/api/room/${id}`);
      fetchRooms();
    } catch (err) {
      console.error("Error deleting room:",err);
    }
  };

  const inputClass =
    "rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30";

  return (
    <div>
      <PageHeader eyebrow="Residence" 
                  title="Rooms" 
                  description="Every room, numbered and typed." />

{/* =========================
          ADD ROOM
    ========================= */}

      <Card spine="ink" className="mb-6 p-6">
        <h3 className="font-display mb-4 text-lg font-semibold text-[#0b1b30]">Add room</h3>
        <div className="flex flex-wrap gap-3">
          <input 
                 className={`${inputClass} w-60`} 
                 placeholder="Room number" 
                 value={form.roomNumber} 
                 onChange={(e) => setForm({ ...form, roomNumber: e.target.value })} />
          <input
                type="number"
                min="1" 
                className={`${inputClass} w-60`} 
                placeholder="Capacity" 
                value={form.capacity} 
                onChange={(e) => setForm({ ...form, capacity: e.target.value })} />   
          <select
              className={`${inputClass} w-60`}
              value={form.hostelId}
              onChange={(e) =>
                setForm({ ...form, hostelId: e.target.value })
              }
            >
              <option value="">Select Hostel</option>

              {hostels.map((hostel) => (
                <option key={hostel.hostelId} value={hostel.hostelId}>
                  {hostel.hostelName}
                </option>
              ))}
            </select>
          <Button variant="accent" onClick={addRoom}>
            Add room
          </Button>
        </div>
      </Card>

{/* =========================
          ROOM TABLE
    ========================= */}

      <Card className="overflow-hidden !pl-0" spine="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EEF2F7] font-mono-num text-xs uppercase tracking-wide text-[#4B5566]">
            <tr>
              <th className="p-3 pl-5">
                Room ID
              </th>
              <th className="p-3 pl-5">Room number</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Hostel</th>
              <th className="p-3 pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.roomId} className="border-t border-[#EEF2F7] hover:bg-[#EEF2F7]">
                <td className="p-3 pl-5 font-mono-num text-[#4B5566]">{r.roomId}</td>
                <td className="p-3 pl-5 font-mono-num font-medium text-[#0b1b30]">{r.roomNumber}</td>
                <td className="p-3 text-[#4B5566]">{r.capacity}</td>
                <td className="p-3 text-[#4B5566]">{r.hostelName}</td>
                <td className="p-3 pr-5 text-right">
                  <Button variant="danger" className="!px-3 !py-1 text-xs" onClick={() => deleteRoom(r.roomId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rooms.length === 0 && (
          <EmptyState title="No rooms available" 
                      description="Add a room above to begin allocating space." />
        )}
      </Card>
    </div>
  );
}
export default Room;
