export function PageWrapper({ children }) {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 24px" }}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
      <div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, fontWeight: 400, lineHeight: 1.1 }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}