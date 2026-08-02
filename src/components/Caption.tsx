import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_SANS, SAFE_X } from "../theme/tokens";

/**
 * On-screen title + optional subtitle, bottom-safe caption for narration.
 */
export const Caption: React.FC<{
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
}> = ({ title, subtitle, align = "center" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = interpolate(frame, [0, 0.7 * fps], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(frame, [0, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      name="Caption"
      style={{
        justifyContent: "flex-end",
        alignItems: align === "center" ? "center" : "flex-start",
        padding: `0 ${SAFE_X}px 120px`,
        fontFamily: FONT_SANS,
        translate: `0px ${rise}px`,
        opacity,
      }}
    >
      {title ? (
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: COLORS.ink,
            letterSpacing: "-0.02em",
            textAlign: align,
          }}
        >
          {title}
        </div>
      ) : null}
      {subtitle ? (
        <div
          style={{
            fontSize: 46,
            fontWeight: 500,
            color: COLORS.inkMuted,
            marginTop: 18,
            textAlign: align,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
