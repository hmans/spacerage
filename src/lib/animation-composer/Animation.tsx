import { animate } from "popmotion"
import { useContext, useEffect } from "react"
import { Group } from "three"
import { AnimatedContext } from "./Animated"

export type AnimationProps<T> = {
  from: T
  to: T
  fun: (group: Group, v: T) => void
}

export const Animation = <T extends any>({
  from,
  to,
  fun
}: AnimationProps<T>) => {
  const group = useContext(AnimatedContext)

  useEffect(() => {
    if (!group.current) return

    animate({
      from,
      to,
      onUpdate: (v) => fun(group.current, v)
    })
  })

  return null
}
