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

    <Animate position={[0, 0, 10]} fun={rotate(0, -0.01, 0)}>
      <PerspectiveCamera makeDefault />
    </Animate>

    <Animate position={[3, 3, -10]} fun={rotate(0.1, 0.2, -0.1)}>
      <mesh>
        <dodecahedronGeometry />
        <meshStandardMaterial color="red" metalness={0.5} roughness={0.6} />
      </mesh>
    </Animate>

    <AsteroidField />
  </group>
)

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return <primitive object={gltf.scene} />
}
