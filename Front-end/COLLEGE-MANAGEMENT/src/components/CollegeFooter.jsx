/**
 * Referenced by About.jsx and CollegeDetails.jsx but wasn't among the
 * uploaded files — added here in the same design system so those pages
 * render correctly. Drop this in src/components/CollegeFooter.jsx.
 */
import { IconSeal } from "./ui/Icons";

function CollegeFooter() {
  return (
    <footer className="bg-[#0b1b30] text-[#EEF2F7]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C88A2E] text-[#C88A2E]">
              <IconSeal />
            </span>
            <span className="font-display text-lg font-semibold text-white">
              Campus Ledger
            </span>
          </div>

          <div className="flex gap-8 text-sm text-white/60">
            <span className="cursor-pointer hover:text-white">About</span>
            <span className="cursor-pointer hover:text-white">Administration</span>
            <span className="cursor-pointer hover:text-white">Admissions</span>
            <span className="cursor-pointer hover:text-white">Contact</span>
          </div>
        </div>

        <p className="pt-6 text-center font-mono-num text-xs text-white/40">
          © 2026 Campus Ledger — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default CollegeFooter;
