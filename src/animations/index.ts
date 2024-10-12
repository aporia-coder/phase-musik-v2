import { VariableTransitions, Variant, Variants } from 'framer-motion'

export const SvgAnim: VariableTransitions | Variant | Variants = {
  initial: { pathLength: 0, pathOffset: 1 },
  animate: { pathLength: 1, pathOffset: 0 },
  transition: { duration: 0.5 },
}
