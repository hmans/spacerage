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
        bloom={{ luminanceThreshold: 0.9, intensity: 2 }}
        antiAliasing
        vignette
        godRays={{
          density: 0.96,
          decay: 200.2,
          weight: 1.3,
          exposure: 0.54,
          samples: 60,
          clampMax: 0.1
        }}
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
