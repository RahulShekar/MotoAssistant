import { AlertTriangle, X, Navigation, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

interface AlertScreenProps {
  onDismiss: () => void;
  onViewRoute: () => void;
}

export function AlertScreen({ onDismiss, onViewRoute }: AlertScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(8px)",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Alert icon */}
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255,179,0,0.12)",
          border: "2px solid rgba(255,179,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          position: "relative",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            border: "1px solid rgba(255,179,0,0.15)",
          }}
        />
        <AlertTriangle size={44} color="#FFB300" />
      </motion.div>

      {/* Alert type */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "#FFB300",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        WEATHER ALERT
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 38,
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "0.04em",
          textAlign: "center",
          lineHeight: 1.1,
          marginBottom: 12,
        }}
      >
        ⚠ RAIN<br />AHEAD
      </div>

      {/* Detail */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: "#888",
          textAlign: "center",
          lineHeight: 1.6,
          marginBottom: 8,
          maxWidth: 280,
        }}
      >
        Heavy rain expected in <strong style={{ color: "#FFB300" }}>35 km</strong> near Rohtang Pass
      </div>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "#555",
          marginBottom: 36,
        }}
      >
        Est. arrival at rain zone: 2:45 PM
      </div>

      {/* Alert details */}
      <div
        style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: "16px",
          width: "100%",
          marginBottom: 24,
        }}
      >
        {[
          { label: "Intensity", value: "Moderate–Heavy" },
          { label: "Duration", value: "~2 hours" },
          { label: "Temperature drop", value: "8°C" },
          { label: "Road surface", value: "Slippery" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>{item.label}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#DDD" }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Moto advice */}
      <div
        style={{
          background: "rgba(255,179,0,0.05)",
          border: "1px solid rgba(255,179,0,0.15)",
          borderRadius: 12,
          padding: "12px 14px",
          width: "100%",
          marginBottom: 28,
        }}
      >
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FFB300", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Moto Advises
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", lineHeight: 1.5 }}>
          "Pull over at Gramphu (22 km) and wait out the rain. The dhaba there offers shelter. Check back in 2 hours."
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
        <button
          onClick={onViewRoute}
          style={{
            width: "100%",
            background: "#FF6B00",
            border: "none",
            borderRadius: 14,
            padding: "16px",
            color: "#FFFFFF",
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Navigation size={18} />
          VIEW ROUTE
        </button>
        <button
          onClick={onViewRoute}
          style={{
            width: "100%",
            background: "#151515",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            padding: "15px",
            color: "#CCC",
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <RotateCcw size={16} />
          ALTERNATIVE ROUTE
        </button>
        <button
          onClick={onDismiss}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "13px",
            color: "#555",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <X size={14} />
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}
