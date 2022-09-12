import { Animate, rotate } from "@hmans/things"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { AsteroidField } from "./AsteroidField"
import { Dust } from "./vfx/Dust"

export const MenuScene = () => (
  <group>
    <ambientLight intensity={0.2} />
    <directionalLight position={[30, 15, 15]} intensity={1} />

    <Dust />

    <OrbitControls autoRotate autoRotateSpeed={0.5} />

    <AsteroidField />
  </group>
)

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return <primitive object={gltf.scene} />
}
