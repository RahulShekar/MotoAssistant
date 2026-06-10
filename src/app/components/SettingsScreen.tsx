import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface SettingsScreenProps {
  onBack: () => void;
}

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    style={{
      width: 44,
      height: 26,
      borderRadius: 13,
      background: value ? "#FF6B00" : "#2A2A2A",
      border: "none",
      cursor: "pointer",
      position: "relative",
      transition: "background 0.2s",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 3,
        left: value ? 21 : 3,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#FFFFFF",
        transition: "left 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
      }}
    />
  </button>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 20px", marginBottom: 8 }}>
      {title}
    </div>
    <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden", margin: "0 20px" }}>
      {children}
    </div>
  </div>
);

const Row = ({
  label,
  sub,
  right,
  onClick,
}: {
  label: string;
  sub?: string;
  right?: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      background: "none",
      border: "none",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: onClick ? "pointer" : "default",
      textAlign: "left",
    }}
  >
    <div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#FFFFFF" }}>{label}</div>
      {sub && <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555", marginTop: 1 }}>{sub}</div>}
    </div>
    {right ?? <ChevronRight size={14} color="#333" />}
  </button>
);

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [voice, setVoice] = useState(true);
  const [haptic, setHaptic] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const [offlineSync, setOfflineSync] = useState(false);
  const [fatigue, setFatigue] = useState(true);
  const [speedAlert, setSpeedAlert] = useState(true);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <div style={{ padding: "48px 20px 20px", marginBottom: 8 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", gap: 4, marginBottom: 12, padding: 0 }}
        >
          <ChevronLeft size={16} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13 }}>Profile</span>
        </button>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
          SETTINGS
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Section title="Voice & Interaction">
          <Row label="Voice Navigation" sub="Moto speaks turn-by-turn" right={<Toggle value={voice} onChange={() => setVoice(!voice)} />} />
          <Row label="Haptic Feedback" sub="Vibrate on alerts" right={<Toggle value={haptic} onChange={() => setHaptic(!haptic)} />} />
          <Row label="AI Companion Personality" sub="Calm & Safety-focused" />
          <Row label="Language" sub="English (India)" />
        </Section>

        <Section title="Safety & Alerts">
          <Row label="Push Alerts" sub="Weather, fuel, road closures" right={<Toggle value={alerts} onChange={() => setAlerts(!alerts)} />} />
          <Row label="Fatigue Monitoring" sub="Alert every 2 hours" right={<Toggle value={fatigue} onChange={() => setFatigue(!fatigue)} />} />
          <Row label="Speed Alerts" sub="Warn above 80 km/h on hills" right={<Toggle value={speedAlert} onChange={() => setSpeedAlert(!speedAlert)} />} />
          <Row label="Emergency Preferences" />
        </Section>

        <Section title="Maps & Navigation">
          <Row label="Offline Maps" sub="Download for current route" right={<Toggle value={offlineSync} onChange={() => setOfflineSync(!offlineSync)} />} />
          <Row label="Map Style" sub="Terrain + road" />
          <Row label="Units" sub="Metric (km, °C, L)" />
          <Row label="Night Mode (Auto)" sub="Switch to dimmer UI after sunset" right={<Toggle value={nightMode} onChange={() => setNightMode(!nightMode)} />} />
        </Section>

        <Section title="Privacy">
          <Row label="Location Sharing" sub="Emergency contact only" />
          <Row label="Ride Data" sub="Stored locally on device" />
          <Row label="Analytics" sub="Anonymous usage data" />
        </Section>

        <Section title="Account">
          <Row label="Rider Profile" />
          <Row label="Emergency Contacts" />
          <Row label="Export All Data" />
          <Row
            label="Sign Out"
            right={<span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#FF3D00" }}>Sign out</span>}
          />
        </Section>

        {/* App info */}
        <div style={{ padding: "0 20px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#333", letterSpacing: "0.06em" }}>
            MOTO<span style={{ color: "rgba(255,107,0,0.4)" }}>OS</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#333", marginTop: 3 }}>
            Version 1.0.0 · Build 2026.06
          </div>
        </div>
      </motion.div>
    </div>
  );
}
