import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { composable, Layer, modules } from "material-composer-r3f"
import { useLayoutEffect } from "react"
import { useRenderPipeline } from "render-composer"
import { Color } from "three"
import { Skybox } from "../../common/Skybox"
import { Animate, float, rotate } from "../../lib/animation-composer/Animate"
import { AsteroidField } from "./AsteroidField"
import { AsteroidBelt } from "./vfx/AsteroidBelt"
import { Dust } from "./vfx/Dust"

export const MenuScene = () => {
  const { sun } = useRenderPipeline()

  useLayoutEffect(() => {
    sun.position.set(1200, 50, -1000)
    sun.scale.setScalar(150)
  }, [])

  return (
    <group>
      <ambientLight intensity={0.1} />
      <directionalLight position={[30, 0, -30]} intensity={2} />

      <Animate position={[0, 0, 10]} fun={rotate(0, -0.02, 0)}>
        <PerspectiveCamera makeDefault />
      </Animate>

      <Dust />
      <Skybox />

      <group position={[30, 0, -30]} rotation={[0.6, 0, -0.2]}>
        <Animate fun={rotate(0.1, 0.15, -0.05)}>
          <mesh scale={9}>
            <sphereGeometry />
            <composable.meshStandardMaterial
              color="brown"
              metalness={0.5}
              roughness={0.6}
            >
              <modules.Color color={new Color("#754")} />
              {/* <modules.Fresnel /> */}
            </composable.meshStandardMaterial>
          </mesh>
        </Animate>
        <AsteroidBelt />
      </group>
    </group>
  )
}
