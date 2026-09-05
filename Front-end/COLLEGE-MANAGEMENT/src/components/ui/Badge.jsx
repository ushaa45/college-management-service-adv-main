const TONES = {
  gold: "bg-[#FBF3E2] text-[#A66E1E] border-[#F0D9AB]",
  sage: "bg-[#E9F1EC] text-[#3F6653] border-[#c7dccf]",
  rust: "bg-[#FBEAE5] text-[#B4472E] border-[#f0cabf]",
  ink: "bg-[#EEF2F7] text-[#132A46] border-[#D7E0EA]",
};

function Badge({ children, tone = "ink", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5
        text-xs font-semibold uppercase tracking-wide font-mono-num
        ${TONES[tone] || TONES.ink} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
