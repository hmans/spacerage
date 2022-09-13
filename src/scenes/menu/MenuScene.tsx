import { PerspectiveCamera } from "@react-three/drei"
import { composable, modules } from "material-composer-r3f"
import { useLayoutEffect } from "react"
import { useRenderPipeline } from "render-composer"
import { Vec3 } from "shader-composer"
import { Color, Quaternion, Vector3 } from "three"
import { Skybox } from "../../common/Skybox"
import {
  Animate,
  AnimateUpdateCallback,
  rotate
} from "../../lib/animation-composer/Animate"
import { AsteroidBelt } from "./vfx/AsteroidBelt"
import { Dust } from "./vfx/Dust"
import { Nebula } from "./vfx/Nebula"

const tmpVec3 = new Vector3()
const tmpQuat = new Quaternion()

export const MenuScene = () => {
  const { sun } = useRenderPipeline()

  useLayoutEffect(() => {
    sun.position.set(1200, 50, -1000)
    sun.scale.setScalar(150)
  }, [])

  const animateCamera: AnimateUpdateCallback = (g, dt, { camera }) => {
    rotate(0, -0.05, 0)(g, dt)
    // camera.getWorldQuaternion(tmpQuat)
    // tmpVec3.set(0, 0, -2 * dt).applyQuaternion(tmpQuat)
    // g.position.add(tmpVec3)
    // g.rotation.z += dt * 0.01
  }

  return (
    <group>
      <ambientLight intensity={0.1} />
      <directionalLight position={[30, 0, -30]} intensity={2} />

      <Animate position={[0, 0, 10]} fun={animateCamera}>
        <PerspectiveCamera makeDefault />
      </Animate>

      <Nebula
        dimensions={Vec3([50, 20, 50])}
        amount={300}
        minSize={5}
        maxSize={20}
        opacity={0.1}
      />

      <Dust />
      <Skybox />

      <group position={[30, 0, -30]} rotation={[0.6, 0, -0.2]}>
        <Nebula dimensions={Vec3([50, 5, 50])} amount={300} opacity={0.2} />

        <mesh scale={9}>
          <sphereGeometry />

          <composable.meshStandardMaterial
            color="brown"
            metalness={0.5}
            roughness={0.6}
          >
            <modules.Color color={new Color("#754")} />
          </composable.meshStandardMaterial>
        </mesh>

        <AsteroidBelt />
      </group>
    </group>
  )
}
