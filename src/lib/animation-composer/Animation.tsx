import { animate } from "motion"
import { useContext, useEffect } from "react"
import { Group } from "three"
import { AnimatedContext } from "./Animated"

export type AnimationProps<T> = {
  duration?: number
  fun: (group: Group, progress: number) => void
}

export const Animation = <T extends any>({
  fun,
  duration = 1
}: AnimationProps<T>) => {
  const group = useContext(AnimatedContext)

  useEffect(() => {
    if (!group.current) return
    animate((progress) => fun(group.current, progress), { duration })
  })

  return null
}
