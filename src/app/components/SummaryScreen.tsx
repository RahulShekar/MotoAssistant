import { Navigation, Clock, Fuel, Zap, MapPin, CloudRain, AlertTriangle, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface SummaryScreenProps {
  onJournal: () => void;
  onHome: () => void;
}

const StatBox = ({ icon, label, value, color = "#FFF" }: { icon: React.ReactNode; label: string; value: string; color?: string }) => (
  <div
    style={{
      background: "#151515",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      padding: "14px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}
  >
    <div style={{ color: "rgba(255,255,255,0.3)" }}>{icon}</div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 600, color }}>{value}</div>
    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
  </div>
);

export function SummaryScreen({ onJournal, onHome }: SummaryScreenProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        paddingBottom: 32,
      }}
    >
      {/* Hero */}
      <div
        style={{
          padding: "48px 20px 24px",
          background: "linear-gradient(to bottom, rgba(0,200,83,0.07), transparent)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          marginBottom: 20,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,200,83,0.12)", border: "1px solid rgba(0,200,83,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>🏁</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#00C853", textTransform: "uppercase", letterSpacing: "0.1em" }}>Ride Complete</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.02em" }}>LEH REACHED</div>
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
            Manali → Leh · 10 June 2026
          </div>
          {/* Route map snapshot placeholder */}
          <div
            style={{
              marginTop: 14,
              borderRadius: 12,
              overflow: "hidden",
              height: 100,
              background: "linear-gradient(135deg, #0D1A0D, #111)",
              border: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg width="100%" height="100" viewBox="0 0 340 100" preserveAspectRatio="none">
              <rect width="340" height="100" fill="#0D1A0D" />
              <path d="M 30 85 C 60 70 80 50 110 45 C 140 40 160 55 190 40 C 220 25 240 20 270 15 C 290 12 310 14 320 12" stroke="#00C853" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="30" cy="85" r="5" fill="#00C853" />
              <circle cx="320" cy="12" r="5" fill="#FF6B00" />
              <text x="20" y="97" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">MANALI</text>
              <text x="295" y="10" fill="rgba(255,107,0,0.7)" fontSize="8" fontFamily="monospace">LEH</text>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <StatBox icon={<Navigation size={16} />} label="Distance" value="476 km" color="#FF6B00" />
        <StatBox icon={<Clock size={16} />} label="Ride Time" value="11h 24m" color="#4FC3F7" />
        <StatBox icon={<Fuel size={16} />} label="Fuel Used" value="17 L" color="#FFB300" />
        <StatBox icon={<Zap size={16} />} label="Avg Speed" value="42 km/h" color="#00C853" />
      </div>

      {/* Ride events */}
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          Ride Events
        </div>
        <div style={{ background: "#111", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { icon: <MapPin size={14} />, label: "Stops made", value: "6", color: "#888" },
            { icon: <CloudRain size={14} />, label: "Weather events", value: "1 rain", color: "#4FC3F7" },
            { icon: <AlertTriangle size={14} />, label: "Road alerts", value: "2", color: "#FFB300" },
            { icon: <Fuel size={14} />, label: "Fuel stops", value: "3 stops", color: "#FF6B00" },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 16px",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <div style={{ color: item.color }}>{item.icon}</div>
              <div style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 13, color: "#888" }}>{item.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#CCC" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          Badges Earned
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { emoji: "🏔️", label: "Pass Conqueror" },
            { emoji: "🛣️", label: "476km Solo" },
            { emoji: "⛽", label: "Fuel Master" },
          ].map((b) => (
            <div
              key={b.label}
              style={{
                flex: 1,
                background: "#151515",
                border: "1px solid rgba(255,107,0,0.2)",
                borderRadius: 12,
                padding: "12px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{b.emoji}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#666" }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={onJournal}
          style={{
            width: "100%",
            background: "#FF6B00",
            border: "none",
            borderRadius: 14,
            padding: "16px",
            color: "#FFFFFF",
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <BookOpen size={18} />
          GENERATE JOURNAL
        </button>
        <button
          onClick={onHome}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "14px",
            color: "#666",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
