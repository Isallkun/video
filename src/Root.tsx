import "./index.css";
import { z } from "zod";
import { Composition, Folder } from "remotion";
import { ArchestraDemo, SCENES, TOTAL_FRAMES } from "./Video";
import { FPS, WIDTH, HEIGHT } from "./theme/tokens";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Problem } from "./scenes/Scene02Problem";
import { Scene03Solution } from "./scenes/Scene03Solution";
import { Scene04Architecture } from "./scenes/Scene04Architecture";
import { Scene05Demo } from "./scenes/Scene05Demo";
import { Scene06Safety } from "./scenes/Scene06Safety";
import { Scene07Roadmap } from "./scenes/Scene07Roadmap";
import { Scene08RealDemo } from "./scenes/Scene08RealDemo";

const base = { fps: FPS, width: WIDTH, height: HEIGHT } as const;

const demoSchema = z.object({
  // Turn off to dub/caption externally (e.g. in CapCut).
  showSubtitles: z.boolean(),
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ArchestraDemo"
        component={ArchestraDemo}
        durationInFrames={TOTAL_FRAMES}
        schema={demoSchema}
        defaultProps={{ showSubtitles: true }}
        {...base}
      />

      <Folder name="Scenes">
        <Composition id="Scene1-Hook" component={Scene01Hook} durationInFrames={SCENES.hook.dur} {...base} />
        <Composition id="Scene2-Problem" component={Scene02Problem} durationInFrames={SCENES.problem.dur} {...base} />
        <Composition id="Scene3-Solution" component={Scene03Solution} durationInFrames={SCENES.solution.dur} {...base} />
        <Composition id="Scene4-Architecture" component={Scene04Architecture} durationInFrames={SCENES.architecture.dur} {...base} />
        <Composition id="Scene5-Demo" component={Scene05Demo} durationInFrames={SCENES.demo.dur} {...base} />
        <Composition id="Scene6-Safety" component={Scene06Safety} durationInFrames={SCENES.safety.dur} {...base} />
        <Composition id="Scene7-Roadmap" component={Scene07Roadmap} durationInFrames={SCENES.roadmap.dur} {...base} />
        <Composition id="Scene8-RealDemo" component={Scene08RealDemo} durationInFrames={SCENES.realDemo.dur} {...base} />
      </Folder>
    </>
  );
};
