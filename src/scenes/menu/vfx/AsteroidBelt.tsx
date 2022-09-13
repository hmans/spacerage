import { useGLTF } from "@react-three/drei"
import { Material, Mesh } from "three"
import { InstanceSetupCallback } from "vfx-composer"
import { Emitter, Particles, useParticles } from "vfx-composer-r3f"
import { composable, modules } from "material-composer-r3f"
import { GroupProps } from "@react-three/fiber"
import {
  $,
  Add,
  Float,
  GlobalTime,
  Input,
  InstanceID,
  Mat3,
  Mul,
  Pow,
  Rotation3D,
  Rotation3DY,
  ScaleAndOffset,
  Sub,
  Vec3
} from "shader-composer"
import { Random } from "shader-composer-toybox"

export const AsteroidBelt = (props: GroupProps) => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  const mesh = gltf.scene.children[0] as Mesh

  const id = Float(InstanceID, { varying: true })

  const random = (offset: Input<"float">) => Random($`${offset} + ${id} * 7.3`)

  const setup: InstanceSetupCallback = () => {}

  return (
    <group {...props}>
      <Particles geometry={mesh.geometry} capacity={10_000}>
        <composable.material instance={mesh.material as Material}>
          {/* Rotate the asteroid */}
          <modules.Rotate
            rotation={Mat3(
              Rotation3D(
                Vec3([random(12), random(84), random(1)]),
                Mul(GlobalTime, Sub(random(-5), 0.5))
              )
            )}
          />

          {/* Scale the asteroid */}
          <modules.Scale scale={ScaleAndOffset(Pow(random(1), 3), 0.3, 0.1)} />

          {/* Apply a random offset (position) */}
          <modules.Translate
            offset={Vec3([Add(Mul(random(2), 40), 15), Mul(random(123), 2), 0])}
          />

          {/* Distribute asteroids radially */}
          <modules.Rotate rotation={Rotation3DY(Mul(random(5), Math.PI * 2))} />

          {/* Rotate everything over time */}
          <modules.Rotate
            rotation={Rotation3DY(Mul(GlobalTime, Mul(random(12), 0.05)))}
          />
        </composable.material>

        {/* Spawn 10.000 of them! */}
        <Emitter limit={10_000} rate={Infinity} setup={setup} />
      </Particles>
    </group>
  )
}
