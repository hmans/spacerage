import { Loader } from "@react-three/drei"
import { Suspense } from "react"
import { RenderCanvas, RenderPipeline } from "render-composer"
import { MenuScene } from "./scenes/menu/MenuScene"
import { GameState } from "./state"

export const App = () => (
  <>
    <Loader />
    <RenderCanvas>
      <RenderPipeline
        bloom={{ luminanceThreshold: 0.2, intensity: 10 }}
        antiAliasing
        vignette
      >
        <Suspense>
          <GameState.Match state="menu">
            <MenuScene />
          </GameState.Match>
        </Suspense>
      </RenderPipeline>
    </RenderCanvas>
  </>
)
