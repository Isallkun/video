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
import { Scene08RealDemo, FOOTAGE_SECONDS } from "./scenes/Scene08RealDemo";

const FPS = 30;
// Scene 8 = 2.5s bridge card + real footage (~58.8s @ 1.4x playback).
const REALDEMO_DUR = Math.ceil(2.5 * FPS + FOOTAGE_SECONDS * FPS);

// Scene timings (30 fps) — animated part mirrors PRD §7; real footage appended.
export const SCENES = {
  hook: { from: 0, dur: 300 },
  problem: { from: 300, dur: 450 },
  solution: { from: 750, dur: 450 },
  architecture: { from: 1200, dur: 600 },
  demo: { from: 1800, dur: 1800 },
  safety: { from: 3600, dur: 450 },
  roadmap: { from: 4050, dur: 450 },
  realDemo: { from: 4500, dur: REALDEMO_DUR },
} as const;

export const TOTAL_FRAMES = 4500 + REALDEMO_DUR;

// Narration subtitles (absolute frames). Conversational but roomy: each line gets
// enough time for the TTS to finish before the next begins (~1s per 2.5 words),
// with a real breath between cues so nothing overlaps.
const CUES: Cue[] = [
  // Scene 1 — Hook (0-300)
  { from: 20, to: 140, text: "DeFi strategies can be incredibly powerful." },
  { from: 150, to: 295, text: "But building and running them safely is genuinely hard." },
  // Scene 2 — Problem (300-750)
  { from: 310, to: 470, text: "Right now the whole experience is manual, risky, and fragmented." },
  { from: 485, to: 620, text: "You juggle a dozen tabs just to move funds around," },
  { from: 630, to: 745, text: "and end up signing blind transactions, hoping for the best." },
  // Scene 3 — Solution (750-1200)
  { from: 760, to: 900, text: "So let's fix that. Meet Archestra." },
  { from: 915, to: 1055, text: "A visual DeFi strategy studio that makes all of this simple." },
  { from: 1070, to: 1195, text: "Compose your strategy as blocks, then run it in a vault you fully own." },
  // Scene 4 — Architecture (1200-1800)
  { from: 1215, to: 1350, text: "So how does it actually work?" },
  { from: 1365, to: 1540, text: "The frontend builds your strategy; the backend prepares calldata and indexes results." },
  { from: 1555, to: 1690, text: "Your wallet is the only thing that signs — nothing moves without you." },
  { from: 1705, to: 1795, text: "Contracts execute inside your own vault, bounded by spending sessions." },
  // Scene 5 — Demo (1800-3600)
  { from: 1815, to: 1960, text: "Alright, let's watch it run live on Arc Testnet." },
  { from: 1975, to: 2150, text: "First, connect your wallet — then pick a strategy template." },
  { from: 2165, to: 2340, text: "We'll grab the stablecoin auto-compound template, a safe, classic yield play." },
  { from: 2355, to: 2560, text: "Now we create the workflow on-chain, registered as Workflow number seven." },
  { from: 2575, to: 2790, text: "Next we activate the dUSDC spending session — the safety layer that caps spending." },
  { from: 2805, to: 2990, text: "Then we mint and fund the vault with a hundred demo USDC." },
  { from: 3005, to: 3150, text: "And now the moment of truth — we hit run." },
  { from: 3165, to: 3380, text: "The vault runs the whole strategy: it deposits a hundred aUSDC," },
  { from: 3390, to: 3520, text: "and yields two hundred crvLP in return." },
  { from: 3530, to: 3690, text: "All in one atomic transaction, with a real receipt on the explorer." },
  // Scene 6 — Safety (3600-4050)
  { from: 3705, to: 3860, text: "And here's what really matters: you own the vault, and you set the limits." },
  { from: 3875, to: 4000, text: "No unlimited approvals — sessions cap spending per run and per day." },
  { from: 4010, to: 4055, text: "And withdrawals always answer to you." },
  // Scene 7 — Roadmap (4050-4500)
  { from: 4065, to: 4290, text: "This is just the start: backend-mediated runs, price-feed conditions, and automation are next." },
  { from: 4305, to: 4420, text: "Archestra — the visual DeFi strategy studio, built on Arc." },
  { from: 4430, to: 4495, text: "But don't just take our word for it." },
  // Scene 8 — Real demo footage (bridge 4500-4575, footage 4575-6339)
  { from: 4515, to: 4720, text: "This is the real Archestra studio, running live on Arc Testnet." },
  { from: 4735, to: 4980, text: "No mockups — this is exactly what you'd see as a real user." },
  { from: 4995, to: 5260, text: "We connect the wallet, then pick a template and create the workflow on-chain." },
  { from: 5275, to: 5540, text: "We open a spending session, then mint and fund the vault with demo USDC." },
  { from: 5555, to: 5790, text: "Everything's in place, so let's go ahead and run the strategy." },
  { from: 5805, to: 6040, text: "Watch the progress update in real time as each step completes." },
  { from: 6055, to: 6220, text: "It's all indexed straight from on-chain events — nothing is faked." },
  { from: 6235, to: TOTAL_FRAMES, text: "That's Archestra — compose, simulate, and run DeFi on-chain, safely." },
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
      <Sequence from={SCENES.realDemo.from} durationInFrames={SCENES.realDemo.dur} name="RealDemo">
        <Scene08RealDemo />
      </Sequence>

      {showSubtitles ? <Subtitles cues={CUES} /> : null}
    </AbsoluteFill>
  );
};
