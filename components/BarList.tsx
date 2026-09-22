export default function BarList({
  items
}: {
  items: { label: string; value: number; suffix?: string }[];
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className="flex flex-col gap-3">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-3">
          <span className="w-10 shrink-0 text-[12px] text-inksoft">{it.label}</span>
          <div className="flex-1 h-2.5 bg-paper2">
            <div
              className="h-full bg-ink"
              style={{ width: `${(it.value / max) * 100}%` }}
            />
          </div>
          <span className="w-14 shrink-0 text-[12px] text-ink text-right">
            {it.value}
            {it.suffix ?? ""}
          </span>
        </div>
      ))}
    </div>
  );
}
