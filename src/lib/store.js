import { motionValue } from 'motion/react'

/* Shared values read by both the DOM and the WebGL scene without re-rendering React.
   power: 0 while the boot screen runs, animates to 1 when the board powers on. */
export const power = motionValue(0)
