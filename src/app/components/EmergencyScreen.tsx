import { useState } from "react";
import { Phone, MapPin, Wrench, X, AlertOctagon } from "lucide-react";
import { motion } from "motion/react";

interface EmergencyScreenProps {
  onClose: () => void;
}

export function EmergencyScreen({ onClose }: EmergencyScreenProps) {
  const [sosActivated, setSosActivated] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleSOS = () => {
    if (!sosActivated) {
      setSosActivated(true);
      let c = 3;
      const t = setInterval(() => {
        c -= 1;
        setCountdown(c);
        if (c <= 0) clearInterval(t);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "absolute",
        inset: 0,
        background: sosActivated ? "rgba(255,61,0,0.06)" : "#0B0B0B",
        zIndex: 95,
        display: "flex",
        flexDirection: "column",
        padding: "48px 20px 32px",
        overflowY: "auto",
        transition: "background 0.5s",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 48,
          right: 20,
          background: "#1A1A1A",
          border: "none",
          borderRadius: 20,
          padding: 8,
          cursor: "pointer",
          color: "#888",
        }}
      >
        <X size={18} />
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28, paddingRight: 40 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#FF3D00",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Emergency Mode
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.02em" }}>
          NEED HELP?
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", marginTop: 4 }}>
          📍 Near Keylong, Himachal Pradesh · 3,120m altitude
        </div>
      </div>

      {/* SOS Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSOS}
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: sosActivated ? "#FF3D00" : "rgba(255,61,0,0.1)",
            border: `3px solid ${sosActivated ? "#FF3D00" : "rgba(255,61,0,0.4)"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {sosActivated && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "50%",
                border: "2px solid rgba(255,61,0,0.4)",
              }}
            />
          )}
          <AlertOctagon size={40} color={sosActivated ? "#FFFFFF" : "#FF3D00"} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 800,
              color: sosActivated ? "#FFFFFF" : "#FF3D00",
              letterSpacing: "0.1em",
              marginTop: 6,
            }}
          >
            SOS
          </span>
          {sosActivated && countdown > 0 && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
              Calling in {countdown}s
            </span>
          )}
        </motion.button>
      </div>

      {sosActivated && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(255,61,0,0.08)",
            border: "1px solid rgba(255,61,0,0.25)",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#FF3D00" }}>
            📍 Live location shared with Priya Singh (+91 98765 43210)
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666", marginTop: 4 }}>
            Emergency services alerted · GPS: 32.0784° N, 77.1734° E
          </div>
        </motion.div>
      )}

      {/* Emergency actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>
          Emergency Actions
        </div>

        {[
          {
            icon: <Phone size={20} />,
            title: "Call Emergency Contact",
            sub: "Priya Singh · +91 98765 43210",
            color: "#4FC3F7",
            bg: "rgba(79,195,247,0.06)",
            border: "rgba(79,195,247,0.2)",
          },
          {
            icon: <MapPin size={20} />,
            title: "Nearest Hospital",
            sub: "Keylong District Hospital · 2.3 km",
            color: "#00C853",
            bg: "rgba(0,200,83,0.06)",
            border: "rgba(0,200,83,0.2)",
          },
          {
            icon: <Wrench size={20} />,
            title: "Nearest Mechanic",
            sub: "Rajesh Motors · 800 m ahead",
            color: "#FFB300",
            bg: "rgba(255,179,0,0.06)",
            border: "rgba(255,179,0,0.2)",
          },
        ].map((item) => (
          <button
            key={item.title}
            style={{
              background: item.bg,
              border: `1px solid ${item.border}`,
              borderRadius: 14,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${item.bg}`,
                border: `1px solid ${item.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: item.color,
              }}
            >
              {item.icon}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#FFFFFF", fontWeight: 500 }}>{item.title}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#666", marginTop: 2 }}>{item.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Medical info */}
      <div
        style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "14px 16px",
        }}
      >
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Medical Info (for responders)
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Blood", value: "B+" },
            { label: "Allergies", value: "None" },
            { label: "Rider", value: "Arjun Singh" },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: "#FF3D00" }}>{m.value}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
