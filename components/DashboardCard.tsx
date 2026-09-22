export default function DashboardCard({
  label,
  value,
  changePct
}: {
  label: string;
  value: string;
  changePct?: number;
}) {
  const positive = (changePct ?? 0) >= 0;
  return (
    <div className="border border-line p-5">
      <p className="text-[12px] text-inksoft mb-2">{label}</p>
      <p className="font-display text-[22px] md:text-[26px] text-ink">{value}</p>
      {typeof changePct === "number" && (
        <p className={`text-[12px] mt-2 ${positive ? "text-success" : "text-danger"}`}>
          {positive ? "↑" : "↓"} {Math.abs(changePct)}%
        </p>
      )}
    </div>
  );
}
