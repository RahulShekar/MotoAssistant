
import { useJourney } from "../context/JourneyContext";
import { useMemo } from "react";
import { Wifi, Thermometer, Fuel, Navigation, Clock, AlertTriangle, Phone, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ScreenWrapper } from "./ui/ScreenWrapper";
import { PrimaryButton } from "./ui/PrimaryButton";
import { SecondaryButton } from "./ui/SecondaryButton";

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

const { currentRider, journeyData } =
  useJourney();

const greeting = useMemo(() => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";

  return "Good Evening";
}, []);

const riderName =
  currentRider?.name || "Rider";

const route =
  journeyData?.route;

const weather =
  journeyData?.weather;

const readinessScore =
  journeyData?.readinessScore || 0;

const motoRecommendations =
  journeyData?.motoRecommendations || [];

const motoWeatherMessage =
  journeyData?.motoWeatherMessage ||
  "Moto intelligence unavailable";

const departureRecommendation =
  journeyData?.departureRecommendation ||
  "No recommendation available";

  const weatherRisk =
  journeyData?.weatherRisk || "LOW";

const journeyRisk =
  journeyData?.journeyRisk || "LOW";

const fuelRange =
  journeyData?.fuelPlan?.maxRangeKm || 0;

const fuelStops =
  journeyData?.fuelPlan?.fuelStopsNeeded || 0;

const fuelPercent =
  Math.max(
    100 - fuelStops * 10,
    40
  );

const routeName =
  route?.routeName ||
  `${route?.origin || ""} → ${route?.destination || ""}`;

const networkStatus =
  navigator.onLine
    ? "ONLINE"
    : "OFFLINE";

const emergencyConfigured =
  currentRider?.emergencyContact
    ? "CONFIGURED"
    : "NOT CONFIGURED";

const eta =
  route?.eta
    ? new Date(route.eta).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown";
  return (
    <ScreenWrapper>
      <div style={{ minHeight: "100%", paddingBottom: 120 }}>
      {/* Header */}
      <div
        style={{
          padding: "24px 0 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>
            {greeting}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
            {riderName.toUpperCase()}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C853" }} />
            <span
            style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "#00C853",
            }}
            >
          Journey Ready • Weather: {weatherRisk} • Risk: {journeyRisk}
          </span>
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
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#00C853" }}>
              {networkStatus}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#1A1A1A", borderRadius: 20, padding: "5px 10px" }}>
            <Phone size={11} color="#4FC3F7" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#4FC3F7" }}>SOS {emergencyConfigured}</span>
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
              {routeName}
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
                {route?.origin || "No Origin"}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#FF6B00", letterSpacing: "0.04em" }}>
                {route?.destination || "No Destination"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>{route?.distanceKm ?? 0} km</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555", marginTop: 1 }}>Distance</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>{route?.durationHours ?? 0} hrs</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555", marginTop: 1 }}>Est. duration</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "#FFB300" }}>{departureRecommendation}</div>
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
              {motoWeatherMessage}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Grid */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <StatCard
        icon={<Fuel size={15} />}
        label="Fuel"
        value={`${fuelPercent}%`}
        sub={`Range ${fuelRange} km`}
        color="#FF6B00"
        delay={0.2}
      />
        <StatCard
          icon={<Thermometer size={15} />}
          label="Weather"
          value={`${weather?.temperature ?? "--"}°C`}
          sub={
          weather?.description ||
          "Weather unavailable"
          }
          color="#4FC3F7"
          delay={0.25}
        />
        <StatCard
        icon={<Navigation size={15} />}
        label="Trip Distance"
        value={`${route?.distanceKm ?? 0} km`}
        sub={`ETA: ${eta}`}
        color="#00C853"
        delay={0.3}
        />
        <StatCard
        icon={<Clock size={15} />}
        label="Ride Duration"
        value={`${route?.durationHours ?? 0} hrs`}
        sub="Google Routes Estimate"
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
              {
                motoRecommendations[0] ||
                "Moto intelligence is preparing recommendations."
              }
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div style={{ padding: "0 20px", display: "flex", gap: 10, marginBottom: 16 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ flex: 2 }}>
          <PrimaryButton onClick={onStartRide} className="flex items-center justify-center gap-2 w-full h-full">
            <Navigation size={18} />
            START RIDE
          </PrimaryButton>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ flex: 1 }}>
          <SecondaryButton onClick={() => onNavigate("readiness")} className="flex items-center justify-center gap-2 h-full">
            CHECK
          </SecondaryButton>
        </motion.div>
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
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, color: "#00C853" }}>{readinessScore}%</span>
          </div>
          <div style={{ background: "#1A1A1A", borderRadius: 4, height: 5, overflow: "hidden" }}>
            <div
              style={{
                width: `${readinessScore}%`,
                height: "100%",
                background: "linear-gradient(90deg, #FF6B00, #00C853)",
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", marginTop: 6 }}>
            {journeyRisk === "High"
  ? "High expedition risk detected. Review route and weather."
  : "Journey intelligence completed successfully."}
          </div>
        </div>
      </motion.div>
      </div>
    </ScreenWrapper>
  );
}
