import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme/tokens";

type Node = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  invert?: boolean;
};

type Edge = { from: string; to: string; label?: string };

const NODE_W = 300;
const NODE_H = 116;

/**
 * Animated architecture diagram. Nodes fade+rise in sequence, edges draw with
 * a stroke-dashoffset sweep. Coordinates are top-left of each node box.
 */
export const FlowDiagram: React.FC<{
  nodes: Node[];
  edges: Edge[];
  width?: number;
  height?: number;
}> = ({ nodes, edges, width = 1560, height = 620 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const center = (n: Node) => ({ cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 });

  return (
    <div style={{ position: "relative", width, height }}>
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.ink} />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = center(nodeById[e.from]);
          const b = center(nodeById[e.to]);
          const len = Math.hypot(b.cx - a.cx, b.cy - a.cy);
          const start = 1 * fps + i * 0.35 * fps;
          const draw = interpolate(frame, [start, start + 0.6 * fps], [len, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const midX = (a.cx + b.cx) / 2;
          const midY = (a.cy + b.cy) / 2;
          const labelOpacity = interpolate(
            frame,
            [start + 0.4 * fps, start + 0.8 * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <g key={i}>
              <line
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke={COLORS.ink}
                strokeWidth={2}
                markerEnd="url(#arrow)"
                strokeDasharray={len}
                strokeDashoffset={draw}
              />
              {e.label ? (
                <foreignObject
                  x={midX - 90}
                  y={midY - 20}
                  width={180}
                  height={40}
                  style={{ overflow: "visible", opacity: labelOpacity }}
                >
                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 18,
                      color: COLORS.inkMuted,
                      background: COLORS.shell,
                      textAlign: "center",
                      padding: "2px 6px",
                    }}
                  >
                    {e.label}
                  </div>
                </foreignObject>
              ) : null}
            </g>
          );
        })}
      </svg>

      {nodes.map((n, i) => {
        const start = i * 0.25 * fps;
        const opacity = interpolate(frame, [start, start + 0.6 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const rise = interpolate(frame, [start, start + 0.6 * fps], [18, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        return (
          <div
            key={n.id}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              width: NODE_W,
              height: NODE_H,
              opacity,
              translate: `0px ${rise}px`,
              background: n.invert ? COLORS.ink : COLORS.shell,
              color: n.invert ? COLORS.onBrand : COLORS.ink,
              border: `1px solid ${n.invert ? COLORS.ink : COLORS.line}`,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 20px",
              boxShadow: n.invert ? "none" : "0 8px 24px rgba(10,10,10,0.06)",
            }}
          >
            <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 600 }}>
              {n.label}
            </div>
            {n.sub ? (
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 18,
                  marginTop: 6,
                  color: n.invert ? "#d4d4d4" : COLORS.inkMuted,
                }}
              >
                {n.sub}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
