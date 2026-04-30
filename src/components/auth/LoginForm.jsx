import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function LoginForm({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handle = async () => {
    if (!form.email || !form.password) { setError("Email dan password wajib diisi"); return; }
    setLoading(true); setError("");
    try {
      await login(form.email, form.password);
    } catch (e) {
      setError(e.response?.data?.message || "Email atau password salah");
    } finally { setLoading(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Input label="Email" type="email" placeholder="kamu@email.com" value={form.email} onChange={set("email")} />
        <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={set("password")}
          onKeyDown={(e) => e.key === "Enter" && handle()} />
        {error && <p style={{ fontSize: 13, color: "var(--danger)" }}>{error}</p>}
        <Button onClick={handle} loading={loading} style={{ width: "100%", marginTop: 4 }}>
          Masuk
        </Button>
      </div>
      <p style={{ marginTop: 22, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
        Belum punya akun?{" "}
        <span onClick={onSwitch} style={{ color: "var(--text)", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
          Daftar
        </span>
      </p>
    </motion.div>
  );
}