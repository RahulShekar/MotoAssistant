import { Settings, ChevronRight, Award, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface ProfileScreenProps {
  onSettings: () => void;
}

const expeditions = [
  { name: "Manali–Leh", date: "Jun 2026", km: 476, badge: "🏔️" },
  { name: "Spiti Circuit", date: "Oct 2025", km: 320, badge: "⛰️" },
  { name: "Leh–Srinagar", date: "Aug 2025", km: 434, badge: "🏞️" },
];

const badges = [
  { emoji: "🏔️", label: "Pass Conqueror", earned: true },
  { emoji: "🛣️", label: "1000km Solo", earned: true },
  { emoji: "🌧️", label: "Rain Rider", earned: true },
  { emoji: "⛽", label: "Fuel Master", earned: true },
  { emoji: "🌙", label: "Night Rider", earned: false },
  { emoji: "🗺️", label: "Off Grid", earned: false },
];

export function ProfileScreen({ onSettings }: ProfileScreenProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        paddingBottom: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(to bottom, rgba(255,107,0,0.06), transparent)",
          padding: "48px 20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Avatar */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255,107,0,0.12)",
                border: "2px solid rgba(255,107,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🏍️
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
                ARJUN SINGH
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555", marginTop: 2 }}>
                Expert Rider · 7+ years
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                <MapPin size={11} color="#FF6B00" />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FF6B00" }}>Manali, HP</span>
              </div>
            </div>
          </div>
          <button
            onClick={onSettings}
            style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 10, cursor: "pointer", color: "#888" }}
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, marginTop: 20 }}>
          {[
            { value: "1,230", label: "Total km" },
            { value: "3", label: "Expeditions" },
            { value: "4", label: "Badges" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 600, color: "#FFFFFF" }}>{stat.value}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bike info */}
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          My Bike
        </div>
        <div
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 32 }}>🏍️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
              Royal Enfield Himalayan
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#555" }}>20L tank</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#555" }}>28 km/L</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#555" }}>B+</span>
            </div>
          </div>
          <ChevronRight size={16} color="#333" />
        </div>
      </div>

      {/* Past expeditions */}
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          Past Expeditions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {expeditions.map((exp, i) => (
            <motion.div
              key={exp.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "13px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 22 }}>{exp.badge}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#FFFFFF" }}>{exp.name}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555", marginTop: 1 }}>{exp.date}</div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#FF6B00" }}>{exp.km} km</div>
              <ChevronRight size={14} color="#333" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Achievements
          </div>
          <Award size={14} color="#FF6B00" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {badges.map((badge) => (
            <div
              key={badge.label}
              style={{
                background: badge.earned ? "#151515" : "#0F0F0F",
                border: `1px solid ${badge.earned ? "rgba(255,107,0,0.2)" : "rgba(255,255,255,0.04)"}`,
                borderRadius: 12,
                padding: "12px 8px",
                textAlign: "center",
                opacity: badge.earned ? 1 : 0.4,
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{badge.emoji}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 9, color: badge.earned ? "#888" : "#444", lineHeight: 1.3 }}>
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
