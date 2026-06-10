import { Wifi, Thermometer, Fuel, Navigation, Clock, AlertTriangle, Phone, Zap } from "lucide-react";
import { motion } from "motion/react";

interface HomeDashboardProps {
  onStartRide: () => void;
  onNavigate: (tab: string) => void;
}

const StatCard = ({
  icon,
  label,
  value,
  sub,
  color = "#FF6B00",
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    style={{
      background: "#151515",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
      <div style={{ color }}>{icon}</div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </span>
    </div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
      {value}
    </div>
    {sub && (
      <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555" }}>{sub}</div>
    )}
  </motion.div>
);

export function HomeDashboard({ onStartRide, onNavigate }: HomeDashboardProps) {
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
          padding: "48px 20px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>
            Good morning
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
            ARJUN SINGH
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C853" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#00C853" }}>All systems nominal</span>
          </div>
        </motion.div>

        {/* Status badges */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#1A1A1A", borderRadius: 20, padding: "5px 10px" }}>
            <Wifi size={11} color="#00C853" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#00C853" }}>4G STRONG</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#1A1A1A", borderRadius: 20, padding: "5px 10px" }}>
            <Phone size={11} color="#4FC3F7" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#4FC3F7" }}>SOS READY</span>
          </div>
        </motion.div>
      </div>

      {/* Route Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ margin: "0 20px 16px" }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1A0F00 0%, #151515 60%)",
            border: "1px solid rgba(255,107,0,0.2)",
            borderRadius: 18,
            padding: "16px 18px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, #FF6B00 0%, transparent 100%)",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Active Route
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#FF6B00",
                background: "rgba(255,107,0,0.1)",
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              NH-3
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C853", border: "2px solid #0B0B0B" }} />
              <div style={{ width: 1.5, height: 20, background: "rgba(255,255,255,0.15)", borderRadius: 1 }} />
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "#FF6B00" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#FFFFFF", marginBottom: 10 }}>
                Manali, HP
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#FF6B00", letterSpacing: "0.04em" }}>
                LEH, LADAKH
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>476 km</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555", marginTop: 1 }}>Distance</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>2 days</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555", marginTop: 1 }}>Est. duration</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, color: "#FFB300" }}>6:30 AM</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555", marginTop: 1 }}>Depart by</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        style={{ margin: "0 20px 16px" }}
      >
        <div
          style={{
            background: "rgba(255,179,0,0.08)",
            border: "1px solid rgba(255,179,0,0.25)",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AlertTriangle size={16} color="#FFB300" />
          <div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#FFB300", fontWeight: 500 }}>
              Weather advisory:
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", marginLeft: 5 }}>
              Light rain near Rohtang Pass after 2 PM
            </span>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Grid */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <StatCard
          icon={<Fuel size={15} />}
          label="Fuel"
          value="72%"
          sub="Range: 320 km"
          color="#FF6B00"
          delay={0.2}
        />
        <StatCard
          icon={<Thermometer size={15} />}
          label="Weather"
          value="24°C"
          sub="No rain for 65 km"
          color="#4FC3F7"
          delay={0.25}
        />
        <StatCard
          icon={<Navigation size={15} />}
          label="Remaining"
          value="187 km"
          sub="ETA: 6:42 PM"
          color="#00C853"
          delay={0.3}
        />
        <StatCard
          icon={<Clock size={15} />}
          label="Ride Time"
          value="4h 12m"
          sub="Avg: 45 km/h"
          color="#A78BFA"
          delay={0.35}
        />
      </div>

      {/* Moto AI nudge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ margin: "0 20px 16px" }}
      >
        <div
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "14px 16px",
            display: "flex",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,107,0,0.12)",
              border: "1px solid rgba(255,107,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={16} color="#FF6B00" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FF6B00", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Moto says
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#CCC", lineHeight: 1.5 }}>
              "You've been riding for 4 hours. Consider a hydration break at the next stop in Keylong."
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div style={{ padding: "0 20px", display: "flex", gap: 10, marginBottom: 16 }}>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={onStartRide}
          style={{
            flex: 2,
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
          <Navigation size={18} />
          START RIDE
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => onNavigate("readiness")}
          style={{
            flex: 1,
            background: "#151515",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            padding: "16px",
            color: "#CCC",
            fontFamily: "var(--font-display)",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.04em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          CHECK
        </motion.button>
      </div>

      {/* Readiness score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        style={{ margin: "0 20px" }}
      >
        <div
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Ride Readiness
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, color: "#00C853" }}>84%</span>
          </div>
          <div style={{ background: "#1A1A1A", borderRadius: 4, height: 5, overflow: "hidden" }}>
            <div
              style={{
                width: "84%",
                height: "100%",
                background: "linear-gradient(90deg, #FF6B00, #00C853)",
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", marginTop: 6 }}>
            Offline maps not downloaded — tap Readiness to complete
          </div>
        </div>
      </motion.div>
    </div>
  );
}
