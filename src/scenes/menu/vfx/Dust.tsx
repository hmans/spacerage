import { composable, modules } from "material-composer-r3f"
import { between, plusMinus } from "randomish"
import {
  Add,
  Float,
  GlobalTime,
  Input,
  InstanceID,
  Mul,
  Rotation3DZ,
  ScaleAndOffset,
  Vec3
} from "shader-composer"
import { Random } from "shader-composer-toybox"
import { Color, DoubleSide } from "three"
import { InstanceSetupCallback } from "vfx-composer"
import { Emitter, Particles } from "vfx-composer-r3f"

/* TODO: extract this into vfx-composer */

export type DustProps = {
  prespawn?: number
  rate?: number
}

export const Dust = ({ rate = 100, prespawn = 1000 }: DustProps) => {
  const id = Float(InstanceID, { varying: true })

  const getRandom = (offset: Input<"float">) => Random(Add(Mul(id, 50), offset))

  const setup: InstanceSetupCallback = ({ position, rotation, scale }) => {
    position.set(plusMinus(30), plusMinus(30), plusMinus(30))
    rotation.random()
  }

  return (
    <group>
      <Particles capacity={4000}>
        <planeGeometry args={[1, 2]} />

        <composable.meshBasicMaterial
          side={DoubleSide}
          color={new Color("white").multiplyScalar(1.1)}
        >
          <modules.Scale scale={ScaleAndOffset(getRandom(765), 0.05, 0.02)} />

          <modules.Rotate
            rotation={Rotation3DZ(Mul(GlobalTime, getRandom(123)))}
          />

          <modules.Velocity
            direction={ScaleAndOffset(
              Vec3([getRandom(1), getRandom(2), getRandom(3)]),
              0.2,
              -0.1
            )}
            time={GlobalTime}
            space="world"
          />
        </composable.meshBasicMaterial>

        <Emitter limit={prespawn} rate={Infinity} setup={setup} />
        <Emitter rate={rate} setup={setup} />
      </Particles>
    </group>
  )
}
