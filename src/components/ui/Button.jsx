import { motion } from 'framer-motion'

export const Button = ({ children, className = '', onClick, variant = 'primary', type = 'button' }) => {
  if (variant === 'primary') {
    return (
      <motion.button 
        type={type}
        className={`button primary ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.button 
      type={type}
      className={`button secondary ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}