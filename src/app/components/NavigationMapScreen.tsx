import { useState } from "react";
import { Mic, Navigation, Fuel, Clock, Thermometer, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface NavigationMapScreenProps {
  onAskMoto: () => void;
  onAlert: () => void;
  onEmergency: () => void;
}

// SVG map simulation of Manali-Leh highway
const MapSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 390 520" preserveAspectRatio="xMidYMid slice">
    {/* Background terrain */}
    <rect width="390" height="520" fill="#0D1A0D" />

    {/* Terrain shapes - mountains */}
    <polygon points="0,300 80,160 160,280 240,120 320,200 390,100 390,520 0,520" fill="#0A1408" />
    <polygon points="0,350 60,220 130,310 200,180 280,260 350,160 390,200 390,520 0,520" fill="#0C1A0C" />

    {/* Water bodies */}
    <ellipse cx="320" cy="380" rx="40" ry="20" fill="#0A1A2A" opacity="0.6" />

    {/* Grid lines (terrain) */}
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 70} x2="390" y2={i * 70} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 70} y1="0" x2={i * 70} y2="520" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
    ))}

    {/* Main highway route */}
    <path
      d="M 195 490 C 190 440 185 400 175 360 C 165 320 150 300 140 270 C 130 240 145 210 160 190 C 175 170 185 155 180 130 C 175 105 165 85 170 60 C 175 35 185 20 195 10"
      stroke="rgba(255,107,0,0.3)"
      strokeWidth="12"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 195 490 C 190 440 185 400 175 360 C 165 320 150 300 140 270 C 130 240 145 210 160 190 C 175 170 185 155 180 130 C 175 105 165 85 170 60 C 175 35 185 20 195 10"
      stroke="#FF6B00"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="6 3"
      opacity="0.8"
    />

    {/* Completed route section */}
    <path
      d="M 195 490 C 190 440 185 400 175 360 C 165 320 150 300 140 270"
      stroke="#00C853"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* POI markers */}
    {/* Fuel station */}
    <circle cx="155" cy="295" r="8" fill="#FFB300" opacity="0.9" />
    <text x="155" y="298" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">⛽</text>

    {/* Hospital */}
    <circle cx="120" cy="340" r="7" fill="#FF6B00" opacity="0.8" />
    <text x="120" y="343" textAnchor="middle" fill="#fff" fontSize="8">+</text>

    {/* Rest stop */}
    <circle cx="165" cy="190" r="7" fill="#4FC3F7" opacity="0.8" />
    <text x="165" y="193" textAnchor="middle" fill="#000" fontSize="8">🏕</text>

    {/* Road closure warning */}
    <circle cx="180" cy="130" r="7" fill="#FF3D00" opacity="0.9" />
    <text x="180" y="133" textAnchor="middle" fill="#fff" fontSize="9">!</text>

    {/* Current position */}
    <circle cx="140" cy="270" r="14" fill="rgba(0,200,83,0.15)" />
    <circle cx="140" cy="270" r="8" fill="#00C853" />
    <circle cx="140" cy="270" r="4" fill="#fff" />

    {/* Heading arrow */}
    <polygon points="140,252 135,262 140,258 145,262" fill="#00C853" />

    {/* Destination */}
    <circle cx="195" cy="10" r="8" fill="rgba(255,107,0,0.3)" />
    <circle cx="195" cy="10" r="4" fill="#FF6B00" />

    {/* Labels */}
    <text x="205" y="14" fill="rgba(255,107,0,0.7)" fontSize="9" fontFamily="monospace">LEH</text>
    <text x="200" y="498" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">MANALI</text>
    <text x="168" y="260" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">YOU</text>

    {/* Weather zone */}
    <ellipse cx="175" cy="100" rx="60" ry="40" fill="rgba(100,149,237,0.06)" stroke="rgba(100,149,237,0.15)" strokeWidth="1" strokeDasharray="4 3" />
    <text x="175" y="88" textAnchor="middle" fill="rgba(100,149,237,0.5)" fontSize="9" fontFamily="monospace">RAIN ZONE</text>
  </svg>
);

export function NavigationMapScreen({ onAskMoto, onAlert, onEmergency }: NavigationMapScreenProps) {
  const [speed] = useState(48);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#0D1A0D", overflow: "hidden" }}>
      {/* Map fills 80% */}
      <div style={{ position: "absolute", inset: 0, top: 70, bottom: 140 }}>
        <MapSVG />
      </div>

      {/* Top HUD */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: "rgba(11,11,11,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "40px 16px 12px",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Distance + ETA */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
              187 <span style={{ fontSize: 14, color: "#555" }}>km</span>
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555" }}>ETA 6:42 PM</div>
          </div>

          {/* Speed */}
          <div
            style={{
              textAlign: "center",
              background: "#151515",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "8px 16px",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 600, color: "#FF6B00", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {speed}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              km/h
            </div>
          </div>

          {/* Status */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(0,200,83,0.08)",
                border: "1px solid rgba(0,200,83,0.2)",
                borderRadius: 20,
                padding: "4px 10px",
                marginBottom: 4,
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C853" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#00C853" }}>LIVE</span>
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555" }}>NH-3 Manali-Leh</div>
          </div>
        </div>
      </div>

      {/* Map legend */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 12,
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {[
          { color: "#FFB300", label: "⛽ Fuel" },
          { color: "#FF6B00", label: "+ Hospital" },
          { color: "#4FC3F7", label: "🏕 Rest" },
          { color: "#FF3D00", label: "! Alert" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "rgba(11,11,11,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#888" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Alert tap */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAlert}
        style={{
          position: "absolute",
          top: 100,
          left: 12,
          zIndex: 15,
          background: "rgba(255,61,0,0.12)",
          border: "1px solid rgba(255,61,0,0.3)",
          borderRadius: 10,
          padding: "8px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <AlertTriangle size={14} color="#FF3D00" />
        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FF3D00" }}>Rain Ahead</span>
      </motion.button>

      {/* Bottom info bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(11,11,11,0.96)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "12px 16px 20px",
          zIndex: 20,
        }}
      >
        {/* Next turn */}
        <div
          style={{
            background: "#151515",
            borderRadius: 12,
            padding: "10px 14px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Navigation size={22} color="#FF6B00" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
              Keep on NH-3
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555", marginTop: 1 }}>
              towards Keylong · 18 km
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#FFB300" }}>⛽ 18km</div>
        </div>

        {/* Bottom metrics */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
                <Fuel size={12} color="#FF6B00" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "#FFF" }}>72%</span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#444" }}>Fuel</div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
                <Thermometer size={12} color="#4FC3F7" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "#FFF" }}>21°C</span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#444" }}>Temp</div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
                <Clock size={12} color="#A78BFA" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "#FFF" }}>4:12</span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#444" }}>Riding</div>
            </div>
          </div>

          {/* Ask Moto FAB */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onAskMoto}
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#FF6B00",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,107,0,0.4)",
              gap: 2,
            }}
          >
            <Mic size={20} color="#fff" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 8, color: "rgba(255,255,255,0.8)", letterSpacing: "0.06em" }}>MOTO</span>
          </motion.button>
        </div>

        {/* SOS */}
        <button
          onClick={onEmergency}
          style={{
            position: "absolute",
            bottom: 72,
            left: 16,
            background: "rgba(255,61,0,0.1)",
            border: "1px solid rgba(255,61,0,0.25)",
            borderRadius: 8,
            padding: "5px 10px",
            cursor: "pointer",
            color: "#FF3D00",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          SOS
        </button>
      </div>
    </div>
  );
}
