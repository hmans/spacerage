import { Animate, rotate } from "@hmans/things"
import { PerspectiveCamera, useGLTF } from "@react-three/drei"
import { Skybox } from "../../common/Skybox"
import { AsteroidField } from "./AsteroidField"
import { Dust } from "./vfx/Dust"

export const MenuScene = () => (
  <group>
    <ambientLight intensity={0.1} />
    <directionalLight position={[30, 0, -30]} intensity={2} />

    <Dust />
    <Skybox />

    <Animate fun={rotate(0, -0.01, 0)}>
      <PerspectiveCamera makeDefault />
    </Animate>

    <AsteroidField />
  </group>
)

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return <primitive object={gltf.scene} />
}
