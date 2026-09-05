function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 px-6 text-center">
      <div className="mb-2 h-10 w-10 rounded-full border-2 border-dashed border-[#D7E0EA]" />
      <p className="font-display text-lg font-semibold text-[#132A46]">
        {title}
      </p>
      {description && (
        <p className="max-w-sm text-sm text-[#4B5566]">{description}</p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export default EmptyState;
