  import { useState, useRef, useEffect } from "react";
  import { NavLink } from "react-router-dom";

function DropdownNav({ label, items, id }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handeClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handeClickOutside);
    return () => {
      document.removeEventListener("mousedown", handeClickOutside);
    };
  }, []); 

  return (
    <div 
      className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 border-r border-white/40 px-3 py-2 text-sm hover:bg-[#101e55] hover:text-[#ffd21c]"
      >
        {label}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[210px] bg-white text-gray-800 shadow-lg">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={`/college/${id}/${item.path}`}
              className="block border-b border-gray-200 px-4 py-3 text-sm hover:bg-[#252ba8] hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownNav;