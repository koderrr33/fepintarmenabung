import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Select } from "../ui/Input";
import { Button } from "../ui/Button";
import { collapseVariant } from "../../lib/variants";

const today = new Date().toISOString().slice(0, 10);

export function TransactionForm({ wallets, categories, onSave, onCancel }) {
  const [form, setForm] = useState({
    wallet_id: wallets[0]?.id || "",
    category_id: categories[0]?.id || "",
    type: "expense",
    amount: "",
    description: "",
    date: today,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handle = async () => {
    if (!form.wallet_id || !form.amount) { setError("Dompet dan jumlah wajib diisi"); return; }
    setLoading(true); setError("");
    try {
      await onSave(form);
    } catch (e) {
      setError(e.response?.data?.message || "Gagal menyimpan transaksi");
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="tx-form"
        variants={collapseVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ background: "var(--surface)", borderRadius: "var(--radius)", padding: 24, marginBottom: 20, border: "1px solid var(--border)" }}
      >
        <p style={{ fontWeight: 600, marginBottom: 16, fontSize: 15 }}>Transaksi Baru</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 12 }}>
          <Select label="Dompet" value={form.wallet_id} onChange={set("wallet_id")}>
            {wallets.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
          </Select>
          <Select label="Kategori" value={form.category_id} onChange={set("category_id")}>
            <option value="">Tanpa kategori</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Select label="Tipe" value={form.type} onChange={set("type")}>
            <option value="expense">Pengeluaran</option>
            <option value="income">Pemasukan</option>
          </Select>
          <Input label="Jumlah (Rp)" type="number" placeholder="0" value={form.amount} onChange={set("amount")} />
          <Input label="Tanggal" type="date" value={form.date} onChange={set("date")} />
          <Input label="Deskripsi" placeholder="Opsional" value={form.description} onChange={set("description")} />
        </div>
        {error && <p style={{ fontSize: 13, color: "var(--danger)", marginBottom: 10 }}>{error}</p>}
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="accent" onClick={handle} loading={loading}>Simpan</Button>
          <Button variant="ghost" onClick={onCancel}>Batal</Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}