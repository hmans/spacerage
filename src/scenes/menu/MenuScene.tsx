import { Animate, rotate } from "@hmans/things"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Dust } from "./vfx/Dust"

export const MenuScene = () => (
  <group>
    <ambientLight intensity={0.2} />
    <directionalLight position={[30, 15, 15]} intensity={1} />

    <Dust />

    <OrbitControls />

    <Animate fun={rotate(0.5, 0.3, -0.2)}>
      <Asteroid />
    </Animate>
  </group>
)

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return <primitive object={gltf.scene} />
}
