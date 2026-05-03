import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export const Input = forwardRef(({ className = '', ...props }, ref) => (
  <motion.div
    className="input-container"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.input
      ref={ref}
      className={`input ${className}`}
      {...props}
      whileFocus={{ scale: 1.01 }}
    />
  </motion.div>
))

Input.displayName = 'Input'