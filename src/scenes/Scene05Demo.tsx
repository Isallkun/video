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
import { DeviceFrame } from "../components/DeviceFrame";
import { MonoBadge } from "../components/MonoBadge";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme/tokens";

const STEPS = [
  { k: "1", label: "Connect wallet to Arc Testnet", mono: "chainId 5042002" },
  { k: "2", label: "Pick template", mono: "Stablecoin auto-compound" },
  { k: "3", label: "Create workflow on-chain", mono: "Workflow #7" },
  { k: "4", label: "Activate spending session", mono: "dUSDC session" },
  { k: "5", label: "Mint + fund the vault", mono: "+100 dUSDC" },
  { k: "6", label: "Run the strategy", mono: "1 atomic tx" },
];

/** A single checklist row: pending -> active -> done, driven by frame. */
const StepRow: React.FC<{
  step: (typeof STEPS)[number];
  index: number;
  frame: number;
  fps: number;
}> = ({ step, index, frame, fps }) => {
  const perStep = 4.4 * fps;
  const start = index * perStep;
  const doneAt = start + perStep * 0.75;

  const opacity = interpolate(frame, [start - 0.3 * fps, start + 0.3 * fps], [0.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isDone = frame >= doneAt;
  const isActive = frame >= start && frame < doneAt;

  const check = interpolate(frame, [doneAt, doneAt + 0.35 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "20px 26px",
        borderRadius: 12,
        border: `1px solid ${isActive ? COLORS.ink : COLORS.line}`,
        background: isActive ? COLORS.surfaceRaised : COLORS.shell,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDone ? COLORS.ink : COLORS.shell,
          border: `1px solid ${COLORS.ink}`,
          color: isDone ? COLORS.onBrand : COLORS.ink,
          fontFamily: FONT_SANS,
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        {isDone ? (
          <span style={{ scale: check, display: "inline-block" }}>✓</span>
        ) : (
          step.k
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 600, color: COLORS.ink }}>
          {step.label}
        </div>
      </div>
      <MonoBadge size={22} invert={isDone}>
        {step.mono}
      </MonoBadge>
    </div>
  );
};

/** Run-result panel (Scene 5 tail). */
const ResultPanel: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rows = [
    "Run finished with 2 steps",
    "deposit  ->  100 aUSDC",
    "yield    ->  200 crvLP",
    "Gas used: 402651",
  ];
  return (
    <div
      style={{
        opacity,
        width: 900,
        background: COLORS.ink,
        borderRadius: 14,
        padding: 48,
        fontFamily: FONT_MONO,
      }}
    >
      <div style={{ color: "#22c55e", fontSize: 26, marginBottom: 20 }}>● run complete</div>
      {rows.map((r, i) => {
        const start = 0.8 * fps + i * 0.35 * fps;
        const o = interpolate(frame, [start, start + 0.4 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              opacity: o,
              color: i === 0 ? "#d4d4d4" : COLORS.onBrand,
              fontSize: i === 0 ? 30 : 36,
              fontWeight: i === 0 ? 400 : 500,
              marginBottom: 14,
            }}
          >
            {r}
          </div>
        );
      })}
      <div
        style={{
          marginTop: 26,
          paddingTop: 22,
          borderTop: "1px solid #333",
          color: "#a3a3a3",
          fontSize: 24,
        }}
      >
        testnet.arcscan.app · Registry 0x88d8…b42F
      </div>
    </div>
  );
};

/** Scene 5 — Live Demo (1:00–2:00). Happy-path walkthrough + result. */
export const Scene05Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: step checklist (0 - ~30s). Phase B: result (~30s - end).
  const resultStart = 27 * fps;

  return (
    <AbsoluteFill name="Scene05Demo" style={{ background: COLORS.shell, fontFamily: FONT_SANS }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <DeviceFrame width={1560} height={860} url="app.archestra.xyz/studio/run">
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flex: 1, padding: "44px 48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}>
                <CanvasImage
                  src={staticFile("assets/arc-logo.jpg")}
                  style={{ width: 44, height: 44, borderRadius: 8 }}
                />
                <div style={{ fontSize: 34, fontWeight: 700, color: COLORS.ink }}>
                  Live on Arc Testnet
                </div>
              </div>

              <Sequence layout="none" durationInFrames={resultStart}>
                <div>
                  {STEPS.map((s, i) => (
                    <StepRow key={s.k} step={s} index={i} frame={frame} fps={fps} />
                  ))}
                </div>
              </Sequence>

              <Sequence from={resultStart} layout="none">
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ResultPanel frame={frame - resultStart} fps={fps} />
                </div>
              </Sequence>
            </div>
          </div>
        </DeviceFrame>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
