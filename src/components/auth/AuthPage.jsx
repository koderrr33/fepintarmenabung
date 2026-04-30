import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "var(--bg)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "var(--surface)",
          borderRadius: 20,
          padding: "40px 44px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Brand */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "var(--muted)", textTransform: "uppercase", marginBottom: 10 }}>
            FINTRACK
          </p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, fontWeight: 400, lineHeight: 1.2 }}>
            {mode === "login" ? "Selamat datang\nkembali" : "Mulai perjalananmu"}
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {mode === "login"
            ? <LoginForm key="login" onSwitch={() => setMode("register")} />
            : <RegisterForm key="register" onSwitch={() => setMode("login")} />
          }
        </AnimatePresence>
      </motion.div>
    </div>
  );
}