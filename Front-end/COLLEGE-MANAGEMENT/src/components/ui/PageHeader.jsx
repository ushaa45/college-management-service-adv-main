function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="
  flex flex-col gap-4
  border-b border-[#D7E0EA]
  pb-5 mb-6
  md:flex-row md:items-end md:justify-between
  dark:border-gray-800
">
      <div>
        {eyebrow && (
          <p className="font-mono-num text-xs uppercase tracking-[0.15em] text-[#A66E1E] mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-semibold text-[#0b1b30]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-[#4B5566]">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default PageHeader;
