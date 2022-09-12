import { Animate, rotate } from "@hmans/things"
import { OrbitControls } from "@react-three/drei"
import { Dust } from "./vfx/Dust"

export const MenuScene = () => (
  <group>
    <ambientLight intensity={0.2} />
    <directionalLight position={[30, 15, 15]} intensity={1} />

    <Dust />

    <OrbitControls />

    <Animate fun={rotate(0.5, 0.3, -0.2)}>
      <mesh>
        <icosahedronGeometry />
        <meshStandardMaterial color="red" metalness={0.5} roughness={0.7} />
      </mesh>
    </Animate>
  </group>
)
