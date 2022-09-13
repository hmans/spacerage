import { GroupProps } from "@react-three/fiber"
import { createContext, MutableRefObject, useRef } from "react"
import { Group } from "three"

export const AnimatedContext = createContext<MutableRefObject<Group>>(null!)

export const Animated = (props: GroupProps) => {
  const group = useRef<Group>(null!)

  return (
    <AnimatedContext.Provider value={group}>
      <group {...props} ref={group} />
    </AnimatedContext.Provider>
  )
}
