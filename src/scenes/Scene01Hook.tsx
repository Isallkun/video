import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_SANS } from "../theme/tokens";

/** Scene 1 — Hook (0:00–0:10). Logo fade-in on white + workflow lines. */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const logoOpacity = interpolate(frame, [0.3 * fps, 1.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const logoScale = interpolate(frame, [0.3 * fps, 2 * fps], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textOpacity = interpolate(frame, [2.2 * fps, 3.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const textRise = interpolate(frame, [2.2 * fps, 3.2 * fps], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Thin animated workflow lines behind the logo.
  const lineLen = 460;
  const lines = [
    { x: width * 0.16, y: height * 0.3 },
    { x: width * 0.66, y: height * 0.24 },
    { x: width * 0.2, y: height * 0.74 },
    { x: width * 0.64, y: height * 0.72 },
  ];

  return (
    <AbsoluteFill name="Scene01Hook" style={{ background: COLORS.shell }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {lines.map((l, i) => {
          const start = 0.2 * fps + i * 0.25 * fps;
          const draw = interpolate(frame, [start, start + 1 * fps], [lineLen, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <g key={i}>
              <line
                x1={l.x}
                y1={l.y}
                x2={l.x + lineLen}
                y2={l.y}
                stroke={COLORS.line}
                strokeWidth={2}
                strokeDasharray={lineLen}
                strokeDashoffset={draw}
              />
              <circle cx={l.x} cy={l.y} r={6} fill={COLORS.line} />
              <circle
                cx={l.x + lineLen}
                cy={l.y}
                r={6}
                fill={draw < 4 ? COLORS.ink : COLORS.line}
              />
            </g>
          );
        })}
      </svg>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            opacity: logoOpacity,
            scale: logoScale,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CanvasImage
            src={staticFile("assets/logo-archestra.png")}
            style={{ width: 520, height: "auto" }}
          />
        </div>

        <div
          style={{
            marginTop: 40,
            opacity: textOpacity,
            translate: `0px ${textRise}px`,
            fontFamily: FONT_SANS,
            fontSize: 60,
            fontWeight: 600,
            color: COLORS.ink,
            letterSpacing: "-0.01em",
          }}
        >
          Compose. Simulate. Run DeFi on-chain.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
