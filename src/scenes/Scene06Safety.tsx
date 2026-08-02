import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MonoBadge } from "../components/MonoBadge";
import { COLORS, FONT_SANS } from "../theme/tokens";

const CARDS = [
  { title: "Spending sessions", body: "Cap per run and per day. Nothing spends beyond your limit.", mono: "max 100 dUSDC / run" },
  { title: "Accepted executor", body: "Only the executor you approve can act inside the vault.", mono: "1 approved address" },
  { title: "Withdraw anytime", body: "Funds stay in a vault you own. Withdrawals answer to you.", mono: "owner = you" },
];

/** Scene 6 — Safety Model (2:00–2:15). */
export const Scene06Safety: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      name="Scene06Safety"
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
          opacity: titleOpacity,
          marginBottom: 64,
          textAlign: "center",
        }}
      >
        You own the vault. You set the limits.
      </div>

      <div style={{ display: "flex", gap: 36 }}>
        {CARDS.map((c, i) => {
          const start = 1 * fps + i * 0.4 * fps;
          const opacity = interpolate(frame, [start, start + 0.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const rise = interpolate(frame, [start, start + 0.7 * fps], [26, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={c.title}
              style={{
                width: 440,
                height: 340,
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
              <div style={{ fontSize: 42, fontWeight: 700, color: COLORS.ink }}>{c.title}</div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 28,
                  color: COLORS.inkMuted,
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                {c.body}
              </div>
              <MonoBadge size={24}>{c.mono}</MonoBadge>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
