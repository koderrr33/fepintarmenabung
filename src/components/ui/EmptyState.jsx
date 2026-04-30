export function EmptyState({ icon = "📭", title = "Tidak ada data", desc = "" }) {
  return (
    <div style={{ padding: "48px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</p>
      {desc && <p style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</p>}
    </div>
  );
}