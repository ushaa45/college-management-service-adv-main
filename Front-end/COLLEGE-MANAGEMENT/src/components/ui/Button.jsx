const VARIANTS = {
  primary:
    "bg-[#132A46] text-[#FAF6EE] hover:bg-[#0b1b30] focus-visible:outline-[#C88A2E]",
  accent:
    "bg-[#C88A2E] text-[#0b1b30] hover:bg-[#A66E1E] font-semibold",
  outline:
    "bg-transparent text-[#132A46] border border-[#132A46]/25 hover:bg-[#132A46]/5",
  ghost: "bg-transparent text-[#132A46] hover:bg-[#132A46]/5",
  danger: "bg-[#B4472E] text-[#FBEAE5] hover:bg-[#973a25]",
};

function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium
        transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant] || VARIANTS.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
