import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DeviceFrame } from "../components/DeviceFrame";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme/tokens";

const Block: React.FC<{
  label: string;
  detail: string;
  appear: number;
  frame: number;
  fps: number;
}> = ({ label, detail, appear, frame, fps }) => {
  const opacity = interpolate(frame, [appear, appear + 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const scale = interpolate(frame, [appear, appear + 0.6 * fps], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        opacity,
        scale,
        width: 300,
        background: COLORS.shell,
        border: `1px solid ${COLORS.ink}`,
        borderRadius: 10,
        padding: 24,
      }}
    >
      <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 600, color: COLORS.ink }}>
        {label}
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: COLORS.inkMuted, marginTop: 8 }}>
        {detail}
      </div>
    </div>
  );
};

/** Scene 3 — Solution Intro (0:25–0:40). Studio canvas with blocks. */
export const Scene03Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const connectorStart = 3 * fps;
  const connector = interpolate(frame, [connectorStart, connectorStart + 0.5 * fps], [120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      name="Scene03Solution"
      style={{
        background: COLORS.shell,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          color: COLORS.ink,
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
          marginBottom: 48,
          textAlign: "center",
          maxWidth: 1400,
        }}
      >
        Archestra: a visual DeFi strategy studio.
      </div>

      <DeviceFrame width={1400} height={620} url="app.archestra.xyz/studio">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            background:
              "repeating-linear-gradient(0deg, #fafafa 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #fafafa 0 1px, transparent 1px 40px)",
          }}
        >
          <Block label="Deposit" detail="100 dUSDC" appear={1.4 * fps} frame={frame} fps={fps} />
          <div style={{ position: "relative", width: 120, height: 4 }}>
            <svg width={120} height={20} style={{ overflow: "visible" }}>
              <line
                x1={0}
                y1={10}
                x2={120}
                y2={10}
                stroke={COLORS.ink}
                strokeWidth={2}
                strokeDasharray={120}
                strokeDashoffset={connector}
                markerEnd="url(#arrowS3)"
              />
              <defs>
                <marker
                  id="arrowS3"
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
            </svg>
          </div>
          <Block label="Yield Farm" detail="crvLP" appear={2.2 * fps} frame={frame} fps={fps} />
        </div>
      </DeviceFrame>
    </AbsoluteFill>
  );
};
