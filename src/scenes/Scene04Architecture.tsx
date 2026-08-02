import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FlowDiagram } from "../components/FlowDiagram";
import { COLORS, FONT_SANS } from "../theme/tokens";

const NODES = [
  { id: "fe", label: "Frontend Studio", sub: "builds strategy", x: 40, y: 60 },
  { id: "be", label: "Backend", sub: "calldata + indexer", x: 630, y: 60, invert: true },
  { id: "wallet", label: "Wallet", sub: "you sign", x: 40, y: 320 },
  { id: "chain", label: "Arc Testnet", sub: "vault + executor", x: 630, y: 320, invert: true },
  { id: "sse", label: "SSE Stream", sub: "live progress", x: 1220, y: 190 },
];

const EDGES = [
  { from: "fe", to: "be", label: "calldata" },
  { from: "fe", to: "wallet" },
  { from: "wallet", to: "chain", label: "signature" },
  { from: "chain", to: "be", label: "events" },
  { from: "be", to: "sse" },
  { from: "sse", to: "fe" },
];

const PILLS = ["User-owned vault", "Spending session caps", "On-chain executor"];

/** Scene 4 — How It Works / Architecture (0:40–1:00). */
export const Scene04Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      name="Scene04Architecture"
      style={{
        background: COLORS.shell,
        alignItems: "center",
        fontFamily: FONT_SANS,
        paddingTop: 120,
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          color: COLORS.ink,
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
          marginBottom: 40,
        }}
      >
        How it works
      </div>

      <FlowDiagram nodes={NODES} edges={EDGES} width={1560} height={480} />

      <div style={{ display: "flex", gap: 24, marginTop: 30 }}>
        {PILLS.map((p, i) => {
          const start = 4 * fps + i * 0.3 * fps;
          const opacity = interpolate(frame, [start, start + 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={p}
              style={{
                opacity,
                padding: "16px 28px",
                borderRadius: 999,
                background: COLORS.surfaceRaised,
                border: `1px solid ${COLORS.line}`,
                fontSize: 30,
                fontWeight: 600,
                color: COLORS.ink,
              }}
            >
              {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
