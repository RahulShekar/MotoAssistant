import { Fuel, CloudRain, AlertTriangle, Brain, Wifi, Shield, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface RiskCardProps {
  icon: React.ReactNode;
  label: string;
  score: "LOW" | "MEDIUM" | "HIGH";
  detail: string;
  delay?: number;
}

const scoreConfig = {
  LOW: { color: "#00C853", bg: "rgba(0,200,83,0.08)", border: "rgba(0,200,83,0.2)" },
  MEDIUM: { color: "#FFB300", bg: "rgba(255,179,0,0.08)", border: "rgba(255,179,0,0.2)" },
  HIGH: { color: "#FF3D00", bg: "rgba(255,61,0,0.08)", border: "rgba(255,61,0,0.2)" },
};

const RiskCard = ({ icon, label, score, detail, delay = 0 }: RiskCardProps) => {
  const cfg = scoreConfig[score];
  const barWidth = score === "LOW" ? "25%" : score === "MEDIUM" ? "60%" : "90%";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{
        background: "#151515",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "16px",
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ color: cfg.color }}>{icon}</div>
        <div style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 14, color: "#FFFFFF" }}>{label}</div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            color: cfg.color,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            padding: "3px 9px",
            borderRadius: 6,
            letterSpacing: "0.08em",
          }}
        >
          {score}
        </div>
      </div>

      {/* Bar */}
      <div style={{ background: "#1A1A1A", borderRadius: 3, height: 4, marginBottom: 8, overflow: "hidden" }}>
        <div
          style={{
            width: barWidth,
            height: "100%",
            background: cfg.color,
            borderRadius: 3,
          }}
        />
      </div>

      <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666", lineHeight: 1.5 }}>{detail}</div>
    </motion.div>
  );
};

export function IntelligenceScreen() {
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
          RIDE INTELLIGENCE
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
          AI risk analysis · Updated 2 min ago
        </div>
      </div>

      {/* Overall risk summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ margin: "0 20px 20px" }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,179,0,0.08), #111)",
            border: "1px solid rgba(255,179,0,0.2)",
            borderRadius: 16,
            padding: "16px 18px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                Overall Ride Risk
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, color: "#FFB300", letterSpacing: "0.04em" }}>
                MODERATE
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666", marginTop: 3 }}>
                2 medium risks detected on route
              </div>
            </div>
            <Brain size={40} color="rgba(255,179,0,0.3)" />
          </div>
        </div>
      </motion.div>

      {/* Risk Cards */}
      <div style={{ padding: "0 20px" }}>
        <RiskCard
          icon={<Fuel size={18} />}
          label="Fuel Risk"
          score="LOW"
          detail="Next fuel stop in 18 km. Range: 320 km. 4 fuel stations on route to Leh."
          delay={0.1}
        />
        <RiskCard
          icon={<CloudRain size={18} />}
          label="Weather Risk"
          score="MEDIUM"
          detail="Light drizzle expected after Rohtang Pass (65 km ahead). Rain probability 62% after 4 PM."
          delay={0.15}
        />
        <RiskCard
          icon={<AlertTriangle size={18} />}
          label="Road Risk"
          score="MEDIUM"
          detail="Construction zone at Gramphu (88 km). Narrow sections on NH-305 near Baralacha La."
          delay={0.2}
        />
        <RiskCard
          icon={<Brain size={18} />}
          label="Fatigue Risk"
          score="HIGH"
          detail="Riding for 4h 12m continuously. High altitude fatigue at 4,200m. Rest recommended at Keylong."
          delay={0.25}
        />
        <RiskCard
          icon={<Wifi size={18} />}
          label="Network Coverage"
          score="LOW"
          detail="Strong 4G until Rohtang. Patchy coverage in Lahaul valley. Offline maps recommended."
          delay={0.3}
        />
        <RiskCard
          icon={<Shield size={18} />}
          label="Emergency Preparedness"
          score="LOW"
          detail="Emergency contact set. Nearest hospital 22 km. First aid kit status: Not confirmed."
          delay={0.35}
        />
      </div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ margin: "8px 20px 0" }}
      >
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          Moto's Insights
        </div>
        <div
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {[
            { text: "Fuel stations become sparse after 90 km from Keylong.", icon: "⛽" },
            { text: "Rain expected after 3 PM. Start early to beat the weather window.", icon: "🌧️" },
            { text: "Network coverage weak after Sissu. Download offline maps.", icon: "📡" },
            { text: "Recommended rest stop at Keylong. Altitude: 2,960m.", icon: "🏕️" },
            { text: "You've been riding 4h 12m. Hydrate and stretch at next stop.", icon: "💧" },
          ].map((insight, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 16px",
                borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{insight.icon}</span>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", lineHeight: 1.5, flex: 1 }}>
                {insight.text}
              </div>
              <ChevronRight size={14} color="#333" style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
