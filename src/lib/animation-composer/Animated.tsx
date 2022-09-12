import { GroupProps } from "@react-three/fiber"
import { createContext, Ref, useRef } from "react"
import { Group } from "three"

export const AnimatedContext = createContext<Ref<Group>>(null!)

export const Animated = (props: GroupProps) => {
  const group = useRef<Group>(null!)

  return (
    <AnimatedContext.Provider value={group}>
      <group {...props} ref={group} />
    </AnimatedContext.Provider>
  )
}
