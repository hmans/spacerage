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
  Rotation3D,
  Rotation3DY,
  ScaleAndOffset,
  Vec3
} from "shader-composer"
import { Random } from "shader-composer-toybox"

export const AsteroidBelt = (props: GroupProps) => {
  const gltf = useGLTF("/models/asteroid03.gltf")
  const mesh = gltf.scene.children[0] as Mesh

  const id = Float(InstanceID, { varying: true })

  const random = (offset: Input<"float">) =>
    Random($`${offset} + ${id} * 100.0`)

  const setup: InstanceSetupCallback = () => {}

  return (
    <group {...props} rotation={[0.4, 0, -0.4]}>
      <Particles geometry={mesh.geometry} capacity={10000}>
        <composable.material instance={mesh.material as Material}>
          <modules.Rotate
            rotation={Mat3(
              Rotation3D(
                Vec3([random(12), random(84), random(1)]),
                Mul(GlobalTime, random(-5))
              )
            )}
          />

          <modules.Scale scale={ScaleAndOffset(random(1), 0.3, 0.1)} />

          <modules.Translate
            offset={Vec3([Add(Mul(random(2), 20), 15), Mul(random(123), 4), 0])}
          />

          <modules.Rotate rotation={Rotation3DY(Mul(random(5), Math.PI * 2))} />
          <modules.Rotate
            rotation={Rotation3DY(Mul(GlobalTime, Mul(random(12), 0.2)))}
          />
        </composable.material>

        <Emitter limit={10000} rate={Infinity} setup={setup} />
      </Particles>
    </group>
  )
}
