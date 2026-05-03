import { motion } from 'framer-motion'

export function PageWrapper({ children }) {
  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

export function PageHeader({ title, subtitle, action, actions }) {
  return (
    <div className="page-header">
      {title && (
        <h2 className="page-title">{title}
          {subtitle && <span className="page-subtitle">{subtitle}</span>}
        </h2>
      )}
      {(action || actions) && (
        <div className="page-header-actions">
          {actions ? (
            <div className="actions-container">{actions}</div>
          ) : (
            <div className="action-container">{action}</div>
          )}
        </div>
      )}
    </div>
  )
}