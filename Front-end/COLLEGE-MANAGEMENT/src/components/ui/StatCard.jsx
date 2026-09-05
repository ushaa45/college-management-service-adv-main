import Card from "./Card";

function StatCard({ label, value, spine = "ink", icon }) {
  return (
    <Card spine={spine} className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono-num text-xs uppercase tracking-wide text-[#4B5566]">
            {label}
          </p>
          <p className="font-display mt-1 text-4xl font-semibold text-[#0b1b30]">
            {value}
          </p>
        </div>
        {icon && (
          <div className="rounded-md bg-[#EEF2F7] p-2 text-[#132A46]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatCard;
