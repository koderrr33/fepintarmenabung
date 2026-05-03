import { motion } from 'framer-motion'

export const Card = ({ children, className = '' }) => (
  <motion.div
    className={`card ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ translateY: -5 }}
  >
    {children}
  </motion.div>
)