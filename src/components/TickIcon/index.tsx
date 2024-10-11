import { motion } from 'framer-motion'

export const TickIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-check w-20 h-20"
    >
      <motion.path
        d="M20 6 9 17l-5-5"
        initial={{ pathLength: 0, pathOffset: 1 }}
        animate={{ pathLength: 1, pathOffset: 0 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  )
}
