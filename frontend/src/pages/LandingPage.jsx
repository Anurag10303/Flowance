import { useNavigate } from "react-router-dom";

const S = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#080B14",
    color: "#E8EAF0",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 48px",
    borderBottom: "0.5px solid rgba(255,255,255,0.07)",
    position: "sticky",
    top: 0,
    background: "rgba(8,11,20,0.92)",
    backdropFilter: "blur(12px)",
    zIndex: 100,
  },
};

function NavBar({ onCta }) {
  return (
    <nav style={S.nav}>
      <span
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 18,
          color: "#fff",
          letterSpacing: "-0.5px",
        }}
      >
        Flow<span style={{ color: "#6EE7B7" }}>ance</span>
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {["Features", "How it works", "Roles"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(" ", "-")}`}
            style={{
              color: "rgba(232,234,240,0.45)",
              fontSize: 14,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8EAF0")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(232,234,240,0.45)")
            }
          >
            {l}
          </a>
        ))}
      </div>
      <button
        onClick={onCta}
        style={{
          background: "#6EE7B7",
          color: "#080B14",
          border: "none",
          padding: "9px 22px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Get started free
      </button>
    </nav>
  );
}

function Badge({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(110,231,183,0.08)",
        border: "0.5px solid rgba(110,231,183,0.22)",
        color: "#6EE7B7",
        fontSize: 12,
        fontWeight: 500,
        padding: "6px 14px",
        borderRadius: 100,
        marginBottom: 28,
        letterSpacing: "0.3px",
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          background: "#6EE7B7",
          borderRadius: "50%",
        }}
      />
      {children}
    </div>
  );
}

function DashboardMockup() {
  const bars = [38, 52, 44, 68, 72, 90, 80, 96];
  return (
    <div
      style={{
        margin: "56px auto 0",
        maxWidth: 860,
        background: "#0D1120",
        border: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#111827",
          padding: "10px 16px",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {["#F87171", "#FBBF24", "#34D399"].map((c) => (
          <div
            key={c}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
              opacity: 0.7,
            }}
          />
        ))}
        <span
          style={{
            fontSize: 11,
            color: "rgba(232,234,240,0.18)",
            marginLeft: 8,
          }}
        >
          app.flowance.io/dashboard
        </span>
      </div>
      {/* Mock content */}
      <div
        style={{
          padding: 18,
          display: "flex",
          gap: 12,
          flexDirection: "column",
        }}
      >
        {/* Summary cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
          }}
        >
          {[
            { label: "Total balance", val: "₹1,24,850", color: "#fff" },
            { label: "Income (Apr)", val: "+₹68,000", color: "#6EE7B7" },
            { label: "Expenses (Apr)", val: "−₹43,150", color: "#F87171" },
          ].map(({ label, val, color }) => (
            <div
              key={label}
              style={{
                background: "#161C2E",
                border: "0.5px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(232,234,240,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: 8,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color,
                }}
              >
                {val}
              </div>
            </div>
          ))}
        </div>
        {/* Charts row */}
        <div
          style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 10 }}
        >
          <div
            style={{
              background: "#161C2E",
              border: "0.5px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "rgba(232,234,240,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 10,
              }}
            >
              Balance trend
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 5,
                height: 70,
                paddingBottom: 2,
              }}
            >
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    borderRadius: "2px 2px 0 0",
                    background: "#6EE7B7",
                    height: `${h}%`,
                    opacity: 0.35 + (i / bars.length) * 0.65,
                  }}
                />
              ))}
            </div>
          </div>
          <div
            style={{
              background: "#161C2E",
              border: "0.5px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "rgba(232,234,240,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 10,
              }}
            >
              Spending
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                style={{ flexShrink: 0 }}
              >
                <circle
                  cx="32"
                  cy="32"
                  r="24"
                  fill="none"
                  stroke="#161C2E"
                  strokeWidth="10"
                />
                {[
                  { color: "#6EE7B7", dash: 45, offset: 0 },
                  { color: "#818CF8", dash: 30, offset: -45 },
                  { color: "#F87171", dash: 18, offset: -75 },
                  { color: "#FBBF24", dash: 12, offset: -93 },
                ].map(({ color, dash, offset }) => (
                  <circle
                    key={color}
                    cx="32"
                    cy="32"
                    r="24"
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeDasharray={`${(dash / 100) * 150.8} 150.8`}
                    strokeDashoffset={`${(-offset / 100) * 150.8}`}
                    transform="rotate(-90 32 32)"
                    opacity={0.85}
                  />
                ))}
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  ["#6EE7B7", "Food"],
                  ["#818CF8", "Housing"],
                  ["#F87171", "Travel"],
                ].map(([c, l]) => (
                  <div
                    key={l}
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 1,
                        background: c,
                      }}
                    />
                    <span
                      style={{ fontSize: 10, color: "rgba(232,234,240,0.4)" }}
                    >
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div
      style={{
        background: "#0D1120",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "24px 26px",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(110,231,183,0.22)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
      }
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "rgba(110,231,183,0.08)",
          border: "0.5px solid rgba(110,231,183,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: "#fff",
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "rgba(232,234,240,0.4)",
          lineHeight: 1.65,
        }}
      >
        {desc}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 500,
        color: "#6EE7B7",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: "Syne, sans-serif",
        fontWeight: 800,
        fontSize: 36,
        color: "#fff",
        lineHeight: 1.12,
        letterSpacing: "-1px",
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  );
}

function SectionSub({ children }) {
  return (
    <p
      style={{
        fontSize: 15,
        color: "rgba(232,234,240,0.4)",
        lineHeight: 1.7,
        maxWidth: 460,
        marginBottom: 0,
      }}
    >
      {children}
    </p>
  );
}

const FEATURES = [
  {
    icon: "◈",
    title: "Real-time analytics",
    desc: "Live charts that update the moment you add or edit a transaction. No refresh needed.",
  },
  {
    icon: "🔐",
    title: "Role-based access",
    desc: "Switch between Viewer (read-only) and Admin (full control) right from the sidebar.",
  },
  {
    icon: "💡",
    title: "Smart observations",
    desc: "Auto-generated insights surface your biggest category, savings trend, and monthly shifts.",
  },
  {
    icon: "⚡",
    title: "Instant filtering",
    desc: "Filter by type, category, and month. Search by description. Sort any column.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Open the dashboard",
    desc: "No login, no setup. Land directly on your financial overview.",
  },
  {
    n: "2",
    title: "Add your transactions",
    desc: "Switch to Admin and start logging income and expenses with category and date.",
  },
  {
    n: "3",
    title: "Read your insights",
    desc: "The Insights page surfaces patterns, top categories, and monthly comparisons automatically.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const goToDashboard = () => navigate("/dashboard");

  return (
    <div style={S.root}>
      <NavBar onCta={goToDashboard} />

      {/* ── HERO ──────────────────────────────────────── */}
      <section
        style={{
          padding: "88px 48px 60px",
          maxWidth: 860,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Badge>Now in public beta</Badge>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 58,
            lineHeight: 1.06,
            letterSpacing: "-2.5px",
            color: "#fff",
            marginBottom: 22,
          }}
        >
          Your money,{" "}
          <em style={{ color: "#6EE7B7", fontStyle: "normal" }}>finally</em>
          <br />
          making sense
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "rgba(232,234,240,0.45)",
            lineHeight: 1.7,
            maxWidth: 500,
            margin: "0 auto 40px",
            fontWeight: 300,
          }}
        >
          Flowance gives you a complete view of your financial life — spending
          patterns, income trends, and smart insights — all in one clean
          interface.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={goToDashboard}
            style={{
              background: "#6EE7B7",
              color: "#080B14",
              border: "none",
              padding: "13px 30px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 500,
              fontFamily: "'DM Sans',sans-serif",
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Open dashboard →
          </button>
          <button
            style={{
              background: "transparent",
              color: "rgba(232,234,240,0.6)",
              border: "0.5px solid rgba(255,255,255,0.14)",
              padding: "13px 30px",
              borderRadius: 10,
              fontSize: 15,
              fontFamily: "'DM Sans',sans-serif",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "#E8EAF0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.color = "rgba(232,234,240,0.6)";
            }}
          >
            See the demo
          </button>
        </div>
        <DashboardMockup />
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 48px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            borderLeft: "0.5px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            { num: "12k+", desc: "Active users" },
            { num: "₹2.4B", desc: "Transactions tracked" },
            { num: "99.9%", desc: "Uptime" },
          ].map(({ num, desc }) => (
            <div
              key={desc}
              style={{
                padding: "28px 0",
                textAlign: "center",
                borderRight: "0.5px solid rgba(255,255,255,0.07)",
                borderBottom: "0.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 32,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {num.includes("₹") ? (
                  <>
                    {num.replace("₹", "")}
                    <span style={{ color: "#6EE7B7" }}>₹</span>
                  </>
                ) : (
                  <>
                    {num.replace(/[k+%]/g, "")}
                    <span style={{ color: "#6EE7B7" }}>
                      {num.match(/[k+%B]+/)?.[0] || ""}
                    </span>
                  </>
                )}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(232,234,240,0.35)",
                  marginTop: 6,
                }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ──────────────────────────────────── */}
      <section
        id="features"
        style={{ padding: "80px 48px", maxWidth: 900, margin: "0 auto" }}
      >
        <SectionLabel>Features</SectionLabel>
        <SectionTitle>
          Everything you need
          <br />
          to stay on top
        </SectionTitle>
        <SectionSub>
          Built for people who want clarity without complexity.
        </SectionSub>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 14,
            marginTop: 44,
          }}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section
        id="how-it-works"
        style={{ padding: "0 48px 80px", maxWidth: 900, margin: "0 auto" }}
      >
        <SectionLabel>How it works</SectionLabel>
        <SectionTitle>
          Up and running
          <br />
          in minutes
        </SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 0,
            marginTop: 44,
          }}
        >
          {STEPS.map(({ n, title, desc }, i) => (
            <div
              key={n}
              style={{ paddingRight: i < 2 ? 28 : 0, position: "relative" }}
            >
              {i < 2 && (
                <div
                  style={{
                    position: "absolute",
                    top: 19,
                    right: 0,
                    width: 28,
                    height: "0.5px",
                    background: "rgba(110,231,183,0.2)",
                  }}
                />
              )}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(110,231,183,0.08)",
                  border: "0.5px solid rgba(110,231,183,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#6EE7B7",
                  marginBottom: 16,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(232,234,240,0.4)",
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROLES ─────────────────────────────────────── */}
      <section
        id="roles"
        style={{ padding: "0 48px 80px", maxWidth: 900, margin: "0 auto" }}
      >
        <SectionLabel>Access control</SectionLabel>
        <SectionTitle>
          Two roles,
          <br />
          built right in
        </SectionTitle>
        <SectionSub>
          Switch between Viewer and Admin from the sidebar. No login needed.
        </SectionSub>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginTop: 44,
          }}
        >
          {[
            {
              chip: "Viewer",
              chipColor: "rgba(148,163,184,0.8)",
              chipBg: "rgba(148,163,184,0.1)",
              title: "Read-only access",
              desc: "Perfect for monitoring without the risk of accidental edits.",
              features: [
                { label: "View all transactions", yes: true },
                { label: "See charts & insights", yes: true },
                { label: "Search & filter", yes: true },
                { label: "Add transactions", yes: false },
                { label: "Edit or delete records", yes: false },
              ],
              accent: false,
            },
            {
              chip: "Admin",
              chipColor: "#6EE7B7",
              chipBg: "rgba(110,231,183,0.1)",
              title: "Full control",
              desc: "Manage your financial data completely. Add, edit, delete, and export.",
              features: [
                { label: "Everything in Viewer", yes: true },
                { label: "Add transactions", yes: true },
                { label: "Edit & delete records", yes: true },
                { label: "Export to CSV", yes: true },
              ],
              accent: true,
            },
          ].map(
            ({ chip, chipColor, chipBg, title, desc, features, accent }) => (
              <div
                key={chip}
                style={{
                  background: "#0D1120",
                  border: `0.5px solid ${accent ? "rgba(110,231,183,0.18)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14,
                  padding: "24px 26px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 500,
                    background: chipBg,
                    color: chipColor,
                    marginBottom: 14,
                  }}
                >
                  {chip}
                </div>
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(232,234,240,0.4)",
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  {desc}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 7 }}
                >
                  {features.map(({ label, yes }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        color: yes
                          ? "rgba(232,234,240,0.55)"
                          : "rgba(232,234,240,0.2)",
                      }}
                    >
                      <span
                        style={{
                          color: yes ? "#6EE7B7" : "rgba(232,234,240,0.18)",
                          fontSize: 12,
                        }}
                      >
                        {yes ? "✓" : "✕"}
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────── */}
      <div style={{ margin: "0 48px 64px" }}>
        <div
          style={{
            background: "#0D1E1A",
            border: "0.5px solid rgba(110,231,183,0.13)",
            borderRadius: 20,
            padding: "56px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 38,
              color: "#fff",
              letterSpacing: "-1px",
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            Start tracking your
            <br />
            finances today
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(232,234,240,0.4)",
              marginBottom: 34,
            }}
          >
            No account. No credit card. Just open it and go.
          </p>
          <button
            onClick={goToDashboard}
            style={{
              background: "#6EE7B7",
              color: "#080B14",
              border: "none",
              padding: "14px 36px",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "'DM Sans',sans-serif",
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Open Flowance →
          </button>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Flow<span style={{ color: "rgba(110,231,183,0.45)" }}>ance</span>
        </span>
        <span style={{ fontSize: 12, color: "rgba(232,234,240,0.2)" }}>
          © 2025 Flowance. Built for internship evaluation.
        </span>
      </footer>
    </div>
  );
}
