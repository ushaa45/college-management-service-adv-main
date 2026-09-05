import { useEffect, useState } from "react";
import API from "../api/axios";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

function Book() {
  const [books, setBooks] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", isbn: "", libraryId: "" });

  const fetchLibraries = async () => {
    try {
      const res = await API.get("/api/libraries");
      console.log("Libraries:", res.data);
      setLibraries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []); 
  const fetchBooks = async () => {
    try {
      const res = await API.get("/api/book");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    if (!form.title || !form.author || !form.isbn || !form.libraryId) {
      alert("Please enter all book details and select a library");
      return;
    }
    try {
        const data = {
        title: form.title,
        author: form.author,
        isbn: form.isbn,
        libraryId: Number(form.libraryId),
      };

      console.log("Adding book:", data);

      await API.post("/api/book", data);

      setForm({ title: "", author: "", isbn: "", libraryId: "" });
      await fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
      if (err.response) {
        console.error("Backend response:", err.response.data);
      }
    }
  };

  const deleteBook = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book? This action cannot be undone.");
    if (!confirmDelete) return;
    if (!bookId) {
      console.error("Book ID is required to delete a book.");
      return;
    }
    try {
      await API.delete(`/api/book/${bookId}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#D7E0EA] bg-[#FFFEFB] px-3 py-2 text-sm text-[#0b1b30] outline-none transition focus:border-[#C88A2E] focus:ring-2 focus:ring-[#C88A2E]/30";

  return (
    <div>
      <PageHeader eyebrow="Library" title="Books" description="The full catalogue, shelf by shelf." />

      <Card spine="gold" className="mb-6 p-6">
        <h3 className="font-display mb-4 text-lg font-semibold text-[#0b1b30]">Add book</h3>
        <div className="grid gap-3 md:grid-cols-4">
          <input className={inputClass} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className={inputClass} placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <input className={inputClass} placeholder="ISBN" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
          <select
            className={inputClass}
            value={form.libraryId}
            onChange={(e) =>
              setForm({
                ...form,
                libraryId: e.target.value,
              })
            }
          >
            <option value="">Select Library</option>

            {libraries.map((library) => (
              <option
                key={library.libraryId}
                value={library.libraryId}
              >
                {library.libraryName}
              </option>
            ))}
          </select>
        </div>
        <Button variant="accent" onClick={addBook} className="mt-4">
          Add book
        </Button>
      </Card>

      <Card className="overflow-hidden !pl-0" spine="none">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EEF2F7] font-mono-num text-xs uppercase tracking-wide text-[#4B5566]">
            <tr>
              <th className="p-3 pl-5">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Library ID</th>
              <th className="p-3 pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookId} className="border-t border-[#EEF2F7] hover:bg-[#FBF3E2]/40">
                <td className="p-3 pl-5 font-medium text-[#0b1b30]">{b.title}</td>
                <td className="p-3 text-[#4B5566]">{b.author}</td>
                <td className="p-3 font-mono-num text-[#4B5566]">{b.isbn}</td>
                <td className="p-3 text-[#4B5566]">{b.libraryId}</td>
                <td className="p-3 pr-5 text-right">
                  <Button variant="danger" className="!px-3 !py-1 text-xs" onClick={() => deleteBook(b.bookId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <EmptyState title="No books found" description="Add your first title above to start the catalogue." />
        )}
      </Card>
    </div>
  );
}

export default Book;
