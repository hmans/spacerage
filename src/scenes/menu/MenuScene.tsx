import { Animate, rotate } from "@hmans/things"
import { PerspectiveCamera, useGLTF } from "@react-three/drei"
import { Vector3 } from "three"
import { Delay, Repeat } from "timeline-composer"
import { Skybox } from "../../common/Skybox"
import { Animated } from "../../lib/animation-composer/Animated"
import { Animation } from "../../lib/animation-composer/Animation"
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

    <Animated position={[3, 3, -10]}>
      <mesh>
        <dodecahedronGeometry />
        <meshStandardMaterial color="red" metalness={0.5} roughness={0.6} />
      </mesh>

      <Repeat seconds={2}>
        <Animation
          fun={(o, v) =>
            o.position.lerpVectors(
              new Vector3(10, 0, -10),
              new Vector3(-10, 0, -10),
              v
            )
          }
        />

        <Delay seconds={1}>
          <Animation
            fun={(o, v) =>
              o.position.lerpVectors(
                new Vector3(-10, 0, -10),
                new Vector3(10, 0, -10),
                v
              )
            }
          />
        </Delay>
      </Repeat>
    </Animated>

    <AsteroidField />
  </group>
)

const Asteroid = () => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  return <primitive object={gltf.scene} />
}
