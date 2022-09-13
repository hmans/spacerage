import { PerspectiveCamera } from "@react-three/drei"
import { Skybox } from "../../common/Skybox"
import { Animate, float, rotate } from "../../lib/animation-composer/Animate"
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

    <Animate fun={float([1, 2, 3])}>
      <Animate fun={rotate(1, 1.5, -0.5)}>
        <mesh>
          <dodecahedronGeometry />
          <meshStandardMaterial color="red" metalness={0.5} roughness={0.6} />
        </mesh>
      </Animate>
    </Animate>

    <AsteroidField />
  </group>
)
