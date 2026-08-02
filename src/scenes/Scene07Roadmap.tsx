import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme/tokens";

const NEXT = [
  "Backend-mediated runs",
  "Price-feed conditions",
  "Automation triggers",
];

/** Scene 7 — Roadmap / Close (2:15–2:30). */
export const Scene07Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const roadmapEnd = 8 * fps;

  return (
    <AbsoluteFill
      name="Scene07Roadmap"
      style={{
        background: COLORS.shell,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_SANS,
      }}
    >
      {/* Phase A: roadmap bullets */}
      <Sequence layout="none" durationInFrames={roadmapEnd}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: COLORS.ink,
              letterSpacing: "-0.02em",
              opacity: interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginBottom: 56,
            }}
          >
            What's next
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {NEXT.map((n, i) => {
              const start = 1 * fps + i * 0.45 * fps;
              const opacity = interpolate(frame, [start, start + 0.6 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });
              const x = interpolate(frame, [start, start + 0.6 * fps], [-30, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });
              return (
                <div
                  key={n}
                  style={{
                    opacity,
                    translate: `${x}px 0px`,
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    fontSize: 46,
                    fontWeight: 500,
                    color: COLORS.ink,
                  }}
                >
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: COLORS.ink,
                      borderRadius: 3,
                    }}
                  />
                  {n}
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Phase B: logo + tagline close */}
      <Sequence from={roadmapEnd} layout="none">
        <ClosePlate frameOffset={frame - roadmapEnd} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

const ClosePlate: React.FC<{ frameOffset: number; fps: number }> = ({ frameOffset, fps }) => {
  const opacity = interpolate(frameOffset, [0, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const scale = interpolate(frameOffset, [0, 1.4 * fps], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{ scale, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CanvasImage
          src={staticFile("assets/logo-archestra.png")}
          style={{ width: 480, height: "auto" }}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 44,
            fontWeight: 500,
            color: COLORS.inkMuted,
          }}
        >
          Visual DeFi strategy studio on Arc.
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: FONT_MONO,
            fontSize: 26,
            color: COLORS.ink,
            padding: "10px 20px",
            border: `1px solid ${COLORS.line}`,
            borderRadius: 8,
            background: COLORS.surfaceRaised,
          }}
        >
          github.com/archestra · testnet.arcscan.app
        </div>
      </div>
    </AbsoluteFill>
  );
};
