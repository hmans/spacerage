import { Loader } from "@react-three/drei"
import { Suspense } from "react"
import * as RC from "render-composer"
import { MenuScene } from "./scenes/menu/MenuScene"
import { GameState } from "./state"

export const App = () => (
  <>
    <Loader />
    <RC.Canvas>
      <RC.RenderPipeline>
        <RC.EffectPass>
          <RC.SelectiveBloomEffect />
          <RC.SMAAEffect />
          {/* {sun && <RC.GodRaysEffect lightSource={sun} />} */}
          <RC.VignetteEffect />
        </RC.EffectPass>

        <Suspense>
          <GameState.Match state="menu">
            <MenuScene />
          </GameState.Match>
        </Suspense>
      </RC.RenderPipeline>
    </RC.Canvas>
  </>
)
