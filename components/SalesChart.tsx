"use client";

import { useRef, useState } from "react";
import { formatPrice } from "@/lib/utils";

interface Point {
  date: string;
  label: string;
  value: number;
}

const WIDTH = 900;
const HEIGHT = 280;
const PAD_L = 10;
const PAD_R = 10;
const PAD_T = 16;
const PAD_B = 30;

export default function SalesChart({ data }: { data: Point[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.value));
  const min = 0;
  const innerW = WIDTH - PAD_L - PAD_R;
  const innerH = HEIGHT - PAD_T - PAD_B;

  const points = data.map((d, i) => {
    const x = PAD_L + (i / (data.length - 1)) * innerW;
    const y = PAD_T + innerH - ((d.value - min) / (max - min)) * innerH;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_T + innerH} L ${points[0].x} ${PAD_T + innerH} Z`;

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = ref.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - relX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setHover(closest);
  }

  const active = hover !== null ? points[hover] : null;

  return (
    <div className="relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-[220px] md:h-[280px]"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B1815" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#1B1815" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD_L}
            x2={WIDTH - PAD_R}
            y1={PAD_T + innerH * (1 - f)}
            y2={PAD_T + innerH * (1 - f)}
            stroke="#EFEAE0"
            strokeWidth="1"
          />
        ))}
        <path d={areaPath} fill="url(#areaFill)" />
        <path d={linePath} fill="none" stroke="#1B1815" strokeWidth="1.75" />
        {points.map((p, i) => (
          <g key={i}>
            {i % 2 === 0 && (
              <text x={p.x} y={HEIGHT - 8} fontSize="10" textAnchor="middle" fill="#8A8073">
                {p.label}
              </text>
            )}
            {hover === i && (
              <>
                <line x1={p.x} x2={p.x} y1={PAD_T} y2={PAD_T + innerH} stroke="#DBD2C1" strokeWidth="1" />
                <circle cx={p.x} cy={p.y} r="4" fill="#1B1815" />
              </>
            )}
          </g>
        ))}
      </svg>
      {active && (
        <div
          className="absolute top-0 bg-ink text-paper text-[11px] px-3 py-2 pointer-events-none -translate-x-1/2"
          style={{ left: `${(active.x / WIDTH) * 100}%` }}
        >
          <p className="whitespace-nowrap">{active.label}</p>
          <p className="whitespace-nowrap font-medium">{formatPrice(active.value)}</p>
        </div>
      )}
    </div>
  );
}
