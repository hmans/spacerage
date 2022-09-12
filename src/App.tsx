import { RenderCanvas, RenderPipeline } from "render-composer";
import { MenuScene } from "./scenes/menu/MenuScene";
import { GameState } from "./state";

export const App = () => (
  <RenderCanvas>
    <RenderPipeline bloom antiAliasing vignette>
      <GameState.Match state="menu">
        <MenuScene />
      </GameState.Match>
    </RenderPipeline>
  </RenderCanvas>
);
