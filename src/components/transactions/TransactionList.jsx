import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionRow } from "./TransactionRow";
import { EmptyState } from "../ui/EmptyState";
import { Card } from "../ui/Card";

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "income", label: "Pemasukan" },
  { id: "expense", label: "Pengeluaran" },
];

export function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState("all");

  const filtered = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              background: filter === f.id ? "var(--text)" : "var(--surface)",
              color: filter === f.id ? "#fff" : "var(--muted)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all .18s",
            }}
          >
            {f.label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--muted)", alignSelf: "center" }}>
          {filtered.length} item
        </span>
      </div>

      <Card>
        {filtered.length === 0
          ? <EmptyState icon="💸" title="Tidak ada transaksi" desc="Tambah transaksi pertamamu di atas" />
          : (
            <AnimatePresence>
              {filtered.map((tx, i) => (
                <TransactionRow key={tx.id} tx={tx} onDelete={onDelete} last={i === filtered.length - 1} />
              ))}
            </AnimatePresence>
          )
        }
      </Card>
    </div>
  );
}