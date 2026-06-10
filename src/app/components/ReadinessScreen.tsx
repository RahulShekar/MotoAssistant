import { useState } from "react";
import { Check, X, Zap } from "lucide-react";
import { motion } from "motion/react";

const defaultChecklist = [
  { id: "helmet", label: "Helmet", icon: "⛑️", done: true },
  { id: "jacket", label: "Riding Jacket", icon: "🧥", done: true },
  { id: "gloves", label: "Gloves", icon: "🧤", done: true },
  { id: "documents", label: "Documents (RC, DL, Insurance)", icon: "📄", done: true },
  { id: "firstaid", label: "First Aid Kit", icon: "🩺", done: false },
  { id: "maps", label: "Offline Maps Downloaded", icon: "🗺️", done: false },
  { id: "service", label: "Bike Service Up to Date", icon: "🔧", done: true },
  { id: "emergency", label: "Emergency Contact Informed", icon: "📞", done: true },
  { id: "fuel", label: "Full Tank / Fuel Planning Done", icon: "⛽", done: true },
];

export function ReadinessScreen() {
  const [items, setItems] = useState(defaultChecklist);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  };

  const doneCount = items.filter((i) => i.done).length;
  const score = Math.round((doneCount / items.length) * 100);

  const scoreColor = score >= 85 ? "#00C853" : score >= 60 ? "#FFB300" : "#FF3D00";

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
      <div style={{ padding: "48px 20px 20px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em", marginBottom: 4 }}>
          RIDE READINESS
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
          Pre-ride safety checklist
        </div>
      </div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ margin: "0 20px 20px" }}
      >
        <div
          style={{
            background: "#111",
            border: `1px solid ${scoreColor}30`,
            borderRadius: 18,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Circular progress */}
          <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#1A1A1A" strokeWidth="6" />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke={scoreColor}
                strokeWidth="6"
                strokeDasharray={`${(score / 100) * 201} 201`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: scoreColor }}>{score}%</span>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
              {score >= 85 ? "RIDE READY" : score >= 60 ? "ALMOST READY" : "NOT READY"}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#666", marginTop: 4 }}>
              {doneCount} of {items.length} checks completed
            </div>
            {/* Progress bar */}
            <div style={{ background: "#1A1A1A", borderRadius: 4, height: 5, marginTop: 10, overflow: "hidden" }}>
              <div
                style={{
                  width: `${score}%`,
                  height: "100%",
                  background: scoreColor,
                  borderRadius: 4,
                  transition: "width 0.4s",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Checklist */}
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => toggle(item.id)}
              style={{
                background: item.done ? "rgba(0,200,83,0.04)" : "#141414",
                border: `1px solid ${item.done ? "rgba(0,200,83,0.2)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 14, color: item.done ? "#CCC" : "#FFFFFF" }}>
                {item.label}
              </div>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: item.done ? "#00C853" : "#1E1E1E",
                  border: `1.5px solid ${item.done ? "#00C853" : "rgba(255,255,255,0.12)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {item.done ? <Check size={13} color="#fff" strokeWidth={3} /> : <X size={12} color="#444" />}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* AI Recommendation */}
      {items.some((i) => !i.done) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ margin: "0 20px" }}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(255,107,0,0.15)",
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              gap: 12,
            }}
          >
            <Zap size={18} color="#FF6B00" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FF6B00", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Moto Recommends
              </div>
              {items.filter((i) => !i.done).map((item) => (
                <div key={item.id} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", marginBottom: 4 }}>
                  • {item.id === "maps" ? "Download offline maps before departure — network is unreliable in Spiti." : `Complete: ${item.label}`}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
