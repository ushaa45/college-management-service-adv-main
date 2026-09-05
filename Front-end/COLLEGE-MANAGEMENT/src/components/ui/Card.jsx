/**
 * Ledger Card — the signature surface of the app.
 * A crisp paper card with a colored spine on the left,
 * echoing an index card / library card.
 */
const SPINES = {
  ink: "before:bg-[#132A46]",
  gold: "before:bg-[#C88A2E]",
  sage: "before:bg-[#3F6653]",
  rust: "before:bg-[#B4472E]",
  none: "before:bg-transparent",
};

function Card({ children, spine = "ink", className = "", as: As = "div", ...props }) {
  return (
    <As
      className={`relative overflow-hidden rounded-lg border border-[#D7E0EA] bg-[#FFFEFB]
        shadow-[0_1px_2px_rgba(11,27,48,0.06)]
        before:absolute before:left-0 before:top-0 before:h-full before:w-1
        ${SPINES[spine] || SPINES.ink} ${className}`}
      {...props}
    >
      <div className="pl-5">{children}</div>
    </As>
  );
}

export default Card;
