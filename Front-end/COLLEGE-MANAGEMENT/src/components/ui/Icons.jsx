/* Small hand-picked line icons — kept dependency-free (no icon package required). */

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconHome = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" />
  </svg>
);
export const IconUsers = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <circle cx="17" cy="8.5" r="2.6" /><path d="M15.5 14.2c2.9.3 5 2.5 5 5.8" />
  </svg>
);
export const IconBuilding = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /><path d="M10 21v-4h4v4" />
  </svg>
);
export const IconBed = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7" /><path d="M3 15h18" />
    <path d="M7 11V7a2 2 0 012-2h6a2 2 0 012 2v4" /><path d="M3 18v3M21 18v3" />
  </svg>
);
export const IconBook = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 16.5v-12z" />
    <path d="M20 19a2.5 2.5 0 01-2.5 2.5H4" />
  </svg>
);
export const IconDoor = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="5" y="2.5" width="12" height="19" rx="1" /><circle cx="14" cy="12" r="0.8" fill="currentColor" />
  </svg>
);
export const IconLogout = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
  </svg>
);
export const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
export const IconUpload = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
  </svg>
);
export const IconSeal = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="M8.5 14.2L7 21l5-2.3L17 21l-1.5-6.8" />
  </svg>
);
export const IconClipboard = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="6" y="4" width="12" height="17" rx="1.5" />
    <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" />
    <path d="M9 10h6M9 14h6M9 18h3" />
  </svg>
);
export const IconUser = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" />
  </svg>
);
export const IconChartbar = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M4 20V10M12 20V4M20 20v-7" />
    <path d="M3 20h18" />
  </svg>
);
