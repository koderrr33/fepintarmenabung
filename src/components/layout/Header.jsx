import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../lib/utils";
import { Button } from "../ui/Button";

const TABS = [
  { id: "dashboard", label: "Ringkasan" },
  { id: "wallets", label: "Dompet" },
  { id: "transactions", label: "Transaksi" },
  { id: "reports", label: "Laporan" },
];

export function Header({ activeTab, onTabChange }) {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 24px",
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, letterSpacing: -0.5, flexShrink: 0 }}>
          FinTrack
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 2 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              style={{
                background: activeTab === t.id ? "var(--bg)" : "transparent",
                border: "none",
                borderRadius: 8,
                padding: "6px 15px",
                fontSize: 14,
                fontWeight: activeTab === t.id ? 600 : 400,
                color: activeTab === t.id ? "var(--text)" : "var(--muted)",
                cursor: "pointer",
                transition: "all .18s",
                fontFamily: "inherit",
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--accent-light)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {getInitials(user?.name)}
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            Keluar
          </Button>
        </div>
      </div>
    </motion.header>
  );
}