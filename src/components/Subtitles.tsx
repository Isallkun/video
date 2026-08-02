import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SANS } from "../theme/tokens";

export type Cue = { from: number; to: number; text: string };

/**
 * Bottom-of-screen narration subtitles. Frame windows are absolute frames of
 * the parent composition (fps=30).
 */
export const Subtitles: React.FC<{ cues: Cue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const active = cues.find((c) => frame >= c.from && frame < c.to);
  if (!active) return null;

  const fade = interpolate(
    frame,
    [active.from, active.from + 6, active.to - 6, active.to],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", pointerEvents: "none" }}>
      <div
        style={{
          opacity: fade,
          marginBottom: 64,
          maxWidth: 1500,
          textAlign: "center",
          fontFamily: FONT_SANS,
          fontSize: 40,
          fontWeight: 500,
          lineHeight: 1.35,
          color: COLORS.onBrand,
          background: "rgba(10,10,10,0.88)",
          padding: "16px 28px",
          borderRadius: 10,
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
