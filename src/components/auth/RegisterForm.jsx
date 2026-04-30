import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function RegisterForm({ onSwitch }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handle = async () => {
    if (!form.name || !form.email || !form.password) { setError("Semua field wajib diisi"); return; }
    setLoading(true); setError("");
    try {
      await register(form.name, form.email, form.password);
    } catch (e) {
      setError(e.response?.data?.message || "Gagal mendaftar, coba lagi");
    } finally { setLoading(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Input label="Nama Lengkap" placeholder="Nama kamu" value={form.name} onChange={set("name")} />
        <Input label="Email" type="email" placeholder="kamu@email.com" value={form.email} onChange={set("email")} />
        <Input label="Password" type="password" placeholder="Min. 8 karakter" value={form.password} onChange={set("password")}
          onKeyDown={(e) => e.key === "Enter" && handle()} />
        {error && <p style={{ fontSize: 13, color: "var(--danger)" }}>{error}</p>}
        <Button onClick={handle} loading={loading} style={{ width: "100%", marginTop: 4 }}>
          Buat Akun
        </Button>
      </div>
      <p style={{ marginTop: 22, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
        Sudah punya akun?{" "}
        <span onClick={onSwitch} style={{ color: "var(--text)", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
          Masuk
        </span>
      </p>
    </motion.div>
  );
}