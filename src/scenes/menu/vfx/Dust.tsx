import { useConst } from "@hmans/things";
import { composable, modules } from "material-composer-r3f";
import { between, plusMinus, upTo } from "randomish";
import { Layers } from "render-composer";
import {
  Add,
  Float,
  GlobalTime,
  Input,
  InstanceID,
  Mul,
  Rotation3DZ,
  Time,
  Vec2,
  Vec3,
} from "shader-composer";
import { PSRDNoise2D, Random } from "shader-composer-toybox";
import { Color, DoubleSide } from "three";
import { InstanceSetupCallback } from "vfx-composer";
import { Emitter, Particles, useParticleAttribute } from "vfx-composer-r3f";

export const Dust = () => {
  const id = Float(InstanceID, { varying: true });

  const getRandom = (offset: Input<"float">) =>
    Random(Add(Mul(id, 50), offset));

  const setup: InstanceSetupCallback = ({ position, rotation, scale }) => {
    position.set(plusMinus(30), plusMinus(30), plusMinus(30));
    rotation.random();
    scale.setScalar(between(0.02, 0.08));
  };

  return (
    <group>
      <Particles capacity={4000}>
        <planeGeometry args={[1, 2]} />

        <composable.meshBasicMaterial
          side={DoubleSide}
          color={new Color("white").multiplyScalar(1.1)}
        >
          <modules.Rotate
            rotation={Rotation3DZ(Mul(GlobalTime, getRandom(123)))}
          />

          <modules.Velocity
            direction={Mul(
              Vec3([getRandom(1), getRandom(2), getRandom(3)]),
              10
            )}
            time={GlobalTime}
            space="world"
          />
        </composable.meshBasicMaterial>

        <Emitter limit={1000} rate={Infinity} setup={setup} />
        <Emitter rate={3} setup={setup} />
      </Particles>
    </group>
  );
};
