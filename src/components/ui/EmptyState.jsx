import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export function EmptyState({ icon, title = "Tidak ada data", message = "Mulai dengan menambahkan transaksi pertama Anda" }) {
  const defaultIcon = icon || <TrendingUp size={48} className="empty-state-icon" />
  
  return (
    <div className="empty-state">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="empty-state-content"
      >
        <div className="empty-state-icon-container">
          {defaultIcon}
        </div>
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-description">{message}</p>
      </motion.div>
    </div>
  )
}