import { motion } from 'framer-motion'

export const CrossIcon = () => {
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
      className="lucide lucide-circle-x w-20 h-20"
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="m15 9-6 6"
        initial={{ pathLength: 0, pathOffset: 1 }}
        animate={{ pathLength: 1, pathOffset: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="m9 9 6 6"
        initial={{ pathLength: 0, pathOffset: 1 }}
        animate={{ pathLength: 1, pathOffset: 0 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  )
}
