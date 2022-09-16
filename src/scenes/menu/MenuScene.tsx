import { PerspectiveCamera } from "@react-three/drei"
import { composable, modules } from "material-composer-r3f"
import {
  bitmask,
  EffectPass,
  GodRaysEffect,
  Layers,
  SelectiveBloomEffect,
  SMAAEffect,
  VignetteEffect
} from "render-composer"
import { Vec3 } from "shader-composer"
import { makeStore, useStore } from "statery"
import { Color, Mesh, Quaternion, Vector3 } from "three"
import { Skybox } from "../../common/Skybox"
import {
  AnimateUpdateCallback,
  rotate
} from "../../lib/animation-composer/Animate"
import { AsteroidBelt } from "./vfx/AsteroidBelt"
import { Dust } from "./vfx/Dust"
import { Nebula } from "./vfx/Nebula"

const store = makeStore({
  sun: null as Mesh | null
})

export const MenuScene = () => {
  const animateCamera = () => (): AnimateUpdateCallback => {
    const tmpVec3 = new Vector3()
    const tmpQuat = new Quaternion()

    return (g, dt, { camera }) => {
      rotate(0, -0.05, 0)(g, dt)
      // camera.getWorldQuaternion(tmpQuat)
      // tmpVec3.set(0, 0, -2 * dt).applyQuaternion(tmpQuat)
      // g.position.add(tmpVec3)
      // g.rotation.z += dt * 0.005
      // g.rotation.x += dt * 0.01
    }
  }

  const { sun } = useStore(store)

  return (
    <group>
      <EffectPass>
        <SMAAEffect />
        <SelectiveBloomEffect intensity={4} luminanceThreshold={0.5} />
        {sun && <GodRaysEffect lightSource={sun} />}
        <VignetteEffect />
      </EffectPass>

      <ambientLight
        intensity={0.1}
        layers-mask={bitmask(Layers.Default, Layers.TransparentFX)}
      />
      <directionalLight
        position={[30, 0, -30]}
        intensity={2}
        layers-mask={bitmask(Layers.Default, Layers.TransparentFX)}
      />

      {/* <Animate position={[0, 0, 10]} fun={animateCamera()}>
        <PerspectiveCamera makeDefault />
      </Animate> */}

      <PerspectiveCamera position={[0, 0, 20]} rotation-y={-0.8} makeDefault />

      <Dust />
      <Skybox />
      {/* <OrbitControls /> */}

      {/* "Sun" */}
      <mesh ref={(sun) => store.set({ sun })} position={[275, 10, -200]}>
        <sphereGeometry args={[40]} />
        <meshBasicMaterial color={new Color("#fff").multiplyScalar(1)} />
      </mesh>

      <group position={[30, 0, -30]} rotation={[0.6, 0, -0.2]}>
        <Nebula
          dimensions={Vec3([40, 10, 40])}
          amount={100}
          opacity={0.3}
          rotationSpeed={0.05}
          maxSize={20}
          minSize={10}
          color={new Color("#fff").multiplyScalar(20)}
        />

        <mesh scale={9}>
          <sphereGeometry args={[1, 32, 32]} />

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
