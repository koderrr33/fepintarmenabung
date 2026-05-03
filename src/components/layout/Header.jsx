import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContext"
import { getInitials } from "../../lib/utils"
import { Button } from "../ui/Button"
import { Wallet } from 'lucide-react'

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "wallets", label: "Wallets" },
  { id: "transactions", label: "Transactions" },
  { id: "reports", label: "Reports" },
]

export function Header({ activeTab, onTabChange }) {
  const { user, logout } = useAuth()

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="main-header"
    >
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">
            <Wallet size={28} className="logo-icon" />
            <div className="logo-text">
              <h1 className="logo-title">FinTrack</h1>
              <p className="logo-tagline">Smart Finance Management</p>
            </div>
          </div>
        </div>

        <nav className="header-nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`nav-tab ${activeTab === t.id ? 'active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="header-right">
          <div className="user-profile">
            <div className="user-avatar">
              <span>{getInitials(user?.name)}</span>
            </div>
            <Button variant="secondary" size="medium" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}