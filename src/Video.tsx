import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "./theme/tokens";
import { Subtitles, type Cue } from "./components/Subtitles";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Problem } from "./scenes/Scene02Problem";
import { Scene03Solution } from "./scenes/Scene03Solution";
import { Scene04Architecture } from "./scenes/Scene04Architecture";
import { Scene05Demo } from "./scenes/Scene05Demo";
import { Scene06Safety } from "./scenes/Scene06Safety";
import { Scene07Roadmap } from "./scenes/Scene07Roadmap";

// Scene timings (30 fps) — mirrors PRD §7 timing table.
export const SCENES = {
  hook: { from: 0, dur: 300 },
  problem: { from: 300, dur: 450 },
  solution: { from: 750, dur: 450 },
  architecture: { from: 1200, dur: 600 },
  demo: { from: 1800, dur: 1800 },
  safety: { from: 3600, dur: 450 },
  roadmap: { from: 4050, dur: 450 },
} as const;

export const TOTAL_FRAMES = 4500; // 150s @ 30fps

// Narration subtitles (absolute frames). Text from PRD §9.
const CUES: Cue[] = [
  { from: 30, to: 300, text: "DeFi strategies are powerful, but running them safely is hard." },
  { from: 320, to: 750, text: "Users juggle approvals, unlimited allowances, and blind transactions." },
  { from: 770, to: 1000, text: "Meet Archestra: a visual DeFi strategy studio." },
  { from: 1010, to: 1200, text: "Compose strategies as blocks, then run them on-chain in a vault you own." },
  { from: 1220, to: 1500, text: "The frontend builds the strategy. The backend prepares calldata and indexes results." },
  { from: 1510, to: 1800, text: "Your wallet signs. Contracts execute inside your own vault, bounded by spending sessions." },
  { from: 1820, to: 2100, text: "Here it runs live on Arc Testnet." },
  { from: 2110, to: 2500, text: "Create the workflow. Open a spending session. Fund the vault. Run." },
  { from: 2510, to: 3600, text: "Every step executes in one atomic on-chain transaction." },
  { from: 3620, to: 3820, text: "You own the vault. You set the limits." },
  { from: 3830, to: 4050, text: "No unlimited approvals. Sessions cap per run and per day." },
  { from: 4070, to: 4300, text: "Next: fully backend-mediated runs, price-feed conditions, and automation." },
  { from: 4310, to: 4500, text: "Archestra — visual DeFi strategy studio on Arc." },
];

export const ArchestraDemo: React.FC<{ showSubtitles?: boolean }> = ({
  showSubtitles = true,
}) => {
  return (
    <AbsoluteFill style={{ background: COLORS.shell }}>
      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.dur} name="Hook">
        <Scene01Hook />
      </Sequence>
      <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.dur} name="Problem">
        <Scene02Problem />
      </Sequence>
      <Sequence from={SCENES.solution.from} durationInFrames={SCENES.solution.dur} name="Solution">
        <Scene03Solution />
      </Sequence>
      <Sequence
        from={SCENES.architecture.from}
        durationInFrames={SCENES.architecture.dur}
        name="Architecture"
      >
        <Scene04Architecture />
      </Sequence>
      <Sequence from={SCENES.demo.from} durationInFrames={SCENES.demo.dur} name="Demo">
        <Scene05Demo />
      </Sequence>
      <Sequence from={SCENES.safety.from} durationInFrames={SCENES.safety.dur} name="Safety">
        <Scene06Safety />
      </Sequence>
      <Sequence from={SCENES.roadmap.from} durationInFrames={SCENES.roadmap.dur} name="Roadmap">
        <Scene07Roadmap />
      </Sequence>

      {showSubtitles ? <Subtitles cues={CUES} /> : null}
    </AbsoluteFill>
  );
};
