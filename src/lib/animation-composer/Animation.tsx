import { animate } from "motion"
import { useContext, useEffect } from "react"
import { Group } from "three"
import { AnimatedContext } from "./Animated"

export type AnimationProps<T> = {
  fun: (group: Group, progress: number) => void
}

export const Animation = <T extends any>({ fun }: AnimationProps<T>) => {
  const group = useContext(AnimatedContext)

  useEffect(() => {
    if (!group.current) return
    animate((progress) => fun(group.current, progress), { duration: 1 })
  })

  return null
}
