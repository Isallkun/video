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
import { Video } from "@remotion/media";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme/tokens";

// Source recording is 82.33s @ 24fps, video-only. Played at 1.4x it lasts ~58.8s.
export const FOOTAGE_PLAYBACK_RATE = 1.4;
export const FOOTAGE_SECONDS = 82.33 / FOOTAGE_PLAYBACK_RATE; // ~58.8s

/** Bridge title card that hands off from the animated close to the real demo. */
const BridgeCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 0.6 * fps, 1.9 * fps, 2.5 * fps], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rise = interpolate(frame, [0, 0.8 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill
      style={{
        background: COLORS.shell,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ translate: `0px ${rise}px`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CanvasImage
          src={staticFile("assets/logo-archestra.png")}
          style={{ width: 160, height: "auto", marginBottom: 24 }}
        />
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 96,
            fontWeight: 700,
            color: COLORS.ink,
            letterSpacing: "-0.02em",
          }}
        >
          See how Archestra works
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 32,
            color: COLORS.inkMuted,
            marginTop: 18,
          }}
        >
          real product · Arc Testnet
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Scene 8 — Real demo footage. A 2.5s bridge title, then the actual screen
 * recording inside the browser chrome, with a persistent brand badge.
 */
export const Scene08RealDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const bridgeDur = 2.5 * fps;

  // Footage fades in as the bridge fades out.
  const footageOpacity = interpolate(frame, [bridgeDur - 0.5 * fps, bridgeDur + 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill name="Scene08RealDemo" style={{ background: COLORS.shell }}>
      <Sequence layout="none" durationInFrames={bridgeDur + 1}>
        <BridgeCard frame={frame} fps={fps} />
      </Sequence>

      <Sequence from={bridgeDur} layout="none">
        <AbsoluteFill style={{ opacity: footageOpacity, background: COLORS.ink }}>
          <Video
            src={staticFile("assets/demo-recording.mp4")}
            playbackRate={FOOTAGE_PLAYBACK_RATE}
            muted
            style={{ width, height }}
            objectFit="contain"
          />
          {/* Persistent brand badge, top-left. */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 40,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px 10px 12px",
              background: "rgba(255,255,255,0.92)",
              border: `1px solid ${COLORS.line}`,
              borderRadius: 999,
            }}
          >
            <CanvasImage
              src={staticFile("assets/logo-archestra.png")}
              style={{ width: 36, height: 36 }}
            />
            <span style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 600, color: COLORS.ink }}>
              Archestra · live on Arc Testnet
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
