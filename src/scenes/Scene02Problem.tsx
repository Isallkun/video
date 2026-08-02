import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { COLORS, FONT_SANS } from "../theme/tokens";

const PAINS = [
  { title: "Manual", body: "Many tabs, endless approvals, copy-pasted addresses." },
  { title: "Risky", body: "Unlimited allowances and blind transactions." },
  { title: "Fragmented", body: "Strategy logic scattered across disconnected tools." },
];

/** Scene 2 — Problem (0:10–0:25). Pain points. */
export const Scene02Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOpacity = interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      name="Scene02Problem"
      style={{
        background: COLORS.shell,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: COLORS.ink,
          letterSpacing: "-0.02em",
          opacity: headOpacity,
          marginBottom: 70,
        }}
      >
        Manual. Risky. Fragmented.
      </div>

      <div style={{ display: "flex", gap: 36 }}>
        {PAINS.map((p, i) => {
          const start = 1 * fps + i * 0.4 * fps;
          const opacity = interpolate(frame, [start, start + 0.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const rise = interpolate(frame, [start, start + 0.7 * fps], [28, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={p.title}
              style={{
                width: 420,
                height: 300,
                opacity,
                translate: `0px ${rise}px`,
                background: COLORS.surfaceRaised,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 14,
                padding: 40,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 8,
                  background: COLORS.ink,
                  color: COLORS.onBrand,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div style={{ marginTop: 28, fontSize: 44, fontWeight: 700, color: COLORS.ink }}>
                {p.title}
              </div>
              <div style={{ marginTop: 14, fontSize: 28, color: COLORS.inkMuted, lineHeight: 1.4 }}>
                {p.body}
              </div>
            </div>
          );
        })}
      </div>

      <Caption />
    </AbsoluteFill>
  );
};
