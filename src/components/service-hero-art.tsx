import { cn } from "@/lib/utils";

const C = "#2D5BD8"; // cobalt accent
const Csoft = "#4F7BEA";

const motifBySlug: Record<string, string> = {
  "ai-automation": "nodes",
  "ai-voice-agents": "waveform",
  "ai-chatbots": "chat",
  "ai-websites-apps": "window",
  "ai-marketing-growth": "trend",
  "ai-creative-studio": "frames",
  "data-intelligence": "bars",
  "ai-strategy-consulting": "compass",
  "ai-business-operations": "flow",
  "ai-security-compliance": "shield",
};

function Motif({ motif }: { motif: string }) {
  switch (motif) {
    case "waveform": {
      const heights = [40, 84, 150, 64, 176, 104, 200, 120, 150, 72, 120, 52, 92];
      return (
        <g>
          {heights.map((h, i) => (
            <rect
              key={i}
              x={20 + i * 28}
              y={160 - h / 2}
              width={12}
              height={h}
              rx={6}
              fill={i % 2 ? C : "#ffffff"}
              fillOpacity={i % 2 ? 0.85 : 0.14}
            />
          ))}
        </g>
      );
    }
    case "nodes": {
      const n = [
        [70, 70],
        [200, 50],
        [330, 120],
        [120, 185],
        [260, 215],
        [355, 250],
        [60, 255],
      ];
      const e = [
        [0, 1],
        [1, 2],
        [0, 3],
        [3, 4],
        [1, 4],
        [2, 5],
        [3, 6],
        [4, 5],
      ];
      return (
        <g>
          {e.map(([a, b], i) => (
            <line
              key={i}
              x1={n[a][0]}
              y1={n[a][1]}
              x2={n[b][0]}
              y2={n[b][1]}
              stroke={C}
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
          ))}
          {n.map((p, i) => (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={i % 3 ? 8 : 13}
              fill={i % 3 ? "#ffffff" : C}
              fillOpacity={i % 3 ? 0.14 : 0.9}
              stroke={C}
              strokeOpacity="0.5"
            />
          ))}
        </g>
      );
    }
    case "bars": {
      const h = [70, 120, 90, 160, 130, 205, 170];
      return (
        <g>
          <line x1="28" y1="272" x2="384" y2="272" stroke="#ffffff" strokeOpacity="0.12" />
          {h.map((v, i) => (
            <rect
              key={i}
              x={40 + i * 49}
              y={272 - v}
              width={30}
              height={v}
              rx={6}
              fill={i === 5 ? C : "#ffffff"}
              fillOpacity={i === 5 ? 0.85 : 0.13}
            />
          ))}
          <polyline
            points={h.map((v, i) => `${55 + i * 49},${272 - v - 12}`).join(" ")}
            fill="none"
            stroke={Csoft}
            strokeWidth="2.5"
            strokeOpacity="0.85"
          />
          {h.map((v, i) => (
            <circle key={`d${i}`} cx={55 + i * 49} cy={272 - v - 12} r="3.5" fill={Csoft} />
          ))}
        </g>
      );
    }
    case "trend": {
      const pts = [
        [40, 250],
        [110, 200],
        [180, 220],
        [250, 140],
        [320, 92],
        [382, 58],
      ];
      return (
        <g>
          <path
            d={`M40,272 ${pts.map((p) => `L${p[0]},${p[1]}`).join(" ")} L382,272 Z`}
            fill={C}
            fillOpacity="0.08"
          />
          <polyline
            points={pts.map((p) => p.join(",")).join(" ")}
            fill="none"
            stroke={C}
            strokeWidth="3"
            strokeOpacity="0.9"
          />
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={i === pts.length - 1 ? 6 : 4.5}
              fill={i === pts.length - 1 ? C : "#ffffff"}
              fillOpacity={i === pts.length - 1 ? 1 : 0.25}
              stroke={C}
              strokeOpacity="0.5"
            />
          ))}
        </g>
      );
    }
    case "chat": {
      return (
        <g>
          <rect x="40" y="66" width="220" height="92" rx="24" fill={C} fillOpacity="0.9" />
          {[88, 128, 168].map((cx) => (
            <circle key={cx} cx={cx} cy="112" r="9" fill="#ffffff" fillOpacity="0.85" />
          ))}
          <rect
            x="150"
            y="182"
            width="212"
            height="84"
            rx="24"
            fill="#ffffff"
            fillOpacity="0.08"
            stroke={C}
            strokeOpacity="0.4"
          />
          <rect x="172" y="208" width="120" height="11" rx="5.5" fill="#ffffff" fillOpacity="0.25" />
          <rect x="172" y="230" width="80" height="11" rx="5.5" fill="#ffffff" fillOpacity="0.16" />
        </g>
      );
    }
    case "window": {
      return (
        <g>
          <rect x="58" y="58" width="300" height="204" rx="16" fill="#ffffff" fillOpacity="0.06" stroke={C} strokeOpacity="0.4" />
          <path d="M58 74a16 16 0 0 1 16-16h268a16 16 0 0 1 16 16v22H58z" fill={C} fillOpacity="0.22" />
          {[80, 98, 116].map((cx) => (
            <circle key={cx} cx={cx} cy="76" r="5" fill="#ffffff" fillOpacity="0.6" />
          ))}
          <rect x="82" y="120" width="150" height="14" rx="7" fill={C} fillOpacity="0.8" />
          <rect x="82" y="148" width="250" height="10" rx="5" fill="#ffffff" fillOpacity="0.14" />
          <rect x="82" y="170" width="210" height="10" rx="5" fill="#ffffff" fillOpacity="0.12" />
          <rect x="82" y="202" width="112" height="30" rx="9" fill={C} fillOpacity="0.6" />
        </g>
      );
    }
    case "frames": {
      return (
        <g>
          <rect
            x="80"
            y="80"
            width="180"
            height="124"
            rx="14"
            fill="#ffffff"
            fillOpacity="0.06"
            stroke={C}
            strokeOpacity="0.4"
            transform="rotate(-8 170 142)"
          />
          <rect
            x="150"
            y="108"
            width="180"
            height="124"
            rx="14"
            fill={C}
            fillOpacity="0.18"
            stroke={C}
            strokeOpacity="0.5"
            transform="rotate(7 240 170)"
          />
          <path d="M222 148 L266 172 L222 196 Z" fill="#ffffff" fillOpacity="0.9" />
          <path d="M324 64 l7 18 l18 7 l-18 7 l-7 18 l-7 -18 l-18 -7 l18 -7 Z" fill={C} />
        </g>
      );
    }
    case "compass": {
      return (
        <g transform="translate(200,160)">
          {[120, 90, 60].map((r) => (
            <circle key={r} r={r} fill="none" stroke={C} strokeOpacity={r === 120 ? 0.25 : 0.4} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 112}
                y1={Math.sin(a) * 112}
                x2={Math.cos(a) * 120}
                y2={Math.sin(a) * 120}
                stroke="#ffffff"
                strokeOpacity="0.2"
              />
            );
          })}
          <path d="M0,-72 L15,0 L0,72 L-15,0 Z" fill={C} fillOpacity="0.85" />
          <circle r="7" fill="#ffffff" />
        </g>
      );
    }
    case "flow": {
      const boxes = [
        [50, 86],
        [182, 56],
        [314, 100],
        [120, 198],
        [262, 212],
      ];
      const edges = [
        [0, 1],
        [1, 2],
        [0, 3],
        [3, 4],
        [1, 4],
      ];
      return (
        <g>
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={boxes[a][0] + 24}
              y1={boxes[a][1] + 24}
              x2={boxes[b][0] + 24}
              y2={boxes[b][1] + 24}
              stroke={C}
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
          ))}
          {boxes.map((p, i) => (
            <rect
              key={i}
              x={p[0]}
              y={p[1]}
              width="48"
              height="48"
              rx="12"
              fill={i % 2 ? C : "#ffffff"}
              fillOpacity={i % 2 ? 0.8 : 0.1}
              stroke={C}
              strokeOpacity="0.4"
            />
          ))}
        </g>
      );
    }
    case "shield": {
      return (
        <g transform="translate(200,158)">
          <path
            d="M0,-112 L96,-76 L96,10 C96,82 46,116 0,136 C-46,116 -96,82 -96,10 L-96,-76 Z"
            fill={C}
            fillOpacity="0.15"
            stroke={C}
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          <path
            d="M0,-72 L60,-48 L60,8 C60,56 30,82 0,96 C-30,82 -60,56 -60,8 L-60,-48 Z"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.15"
          />
          <path
            d="M-26,6 L-8,26 L30,-22"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </g>
      );
    }
    default:
      return null;
  }
}

export function ServiceHeroArt({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const motif = motifBySlug[slug] ?? "nodes";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden md:block",
        className
      )}
    >
      <div className="absolute right-0 top-1/2 size-[26rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-electric/10 blur-[90px]" />
      <svg
        viewBox="0 0 400 320"
        className="absolute right-4 top-1/2 h-[78%] -translate-y-1/2"
        fill="none"
      >
        <Motif motif={motif} />
      </svg>
    </div>
  );
}
