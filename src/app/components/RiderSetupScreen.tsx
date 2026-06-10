import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface RiderSetupScreenProps {
  onComplete: () => void;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const bikeModels = [
  "Royal Enfield Himalayan",
  "Royal Enfield Classic 350",
  "KTM 390 Adventure",
  "KTM 250 Adventure",
  "BMW F 850 GS",
  "BMW R 1250 GS",
  "Hero Xpulse 200",
  "Honda CB500X",
  "Other",
];
const experiences = ["Beginner (< 1 year)", "Intermediate (1–3 years)", "Experienced (3–7 years)", "Expert (7+ years)"];

const Field = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div style={{ marginBottom: 16 }}>
    <div
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 11,
        color: "#666",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 6,
      }}
    >
      {label}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "#1A1A1A",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "14px 16px",
        color: "#FFFFFF",
        fontFamily: "var(--font-body)",
        fontSize: 15,
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  </div>
);

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <div style={{ marginBottom: 16 }}>
    <div
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 11,
        color: "#666",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 6,
      }}
    >
      {label}
    </div>
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "14px 40px 14px 16px",
          color: value ? "#FFFFFF" : "#555",
          fontFamily: "var(--font-body)",
          fontSize: 15,
          outline: "none",
          appearance: "none",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#1A1A1A" }}>{o}</option>
        ))}
      </select>
      <ChevronDown
        size={16}
        color="#555"
        style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      />
    </div>
  </div>
);

export function RiderSetupScreen({ onComplete }: RiderSetupScreenProps) {
  const [name, setName] = useState("");
  const [bike, setBike] = useState("");
  const [tank, setTank] = useState("");
  const [mileage, setMileage] = useState("");
  const [emergency, setEmergency] = useState("");
  const [blood, setBlood] = useState("");
  const [experience, setExperience] = useState("");

  const canProceed = name && bike && tank && mileage && emergency && blood && experience;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "52px 24px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#0B0B0B",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            color: "#FF6B00",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          One-time setup
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
          }}
        >
          RIDER PROFILE
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", marginTop: 6 }}>
          Help Moto keep you safe on the road
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: "24px 24px 120px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Field label="Rider Name" placeholder="Arjun Singh" value={name} onChange={setName} />

          <SelectField label="Motorcycle Model" value={bike} options={bikeModels} onChange={setBike} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                Tank (Litres)
              </div>
              <input
                type="number"
                placeholder="20"
                value={tank}
                onChange={(e) => setTank(e.target.value)}
                style={{
                  width: "100%",
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                Mileage (km/L)
              </div>
              <input
                type="number"
                placeholder="28"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                style={{
                  width: "100%",
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <Field label="Emergency Contact" placeholder="+91 98765 43210" value={emergency} onChange={setEmergency} type="tel" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <SelectField label="Blood Group" value={blood} options={bloodGroups} onChange={setBlood} />
            <div style={{ marginBottom: 0 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                &nbsp;
              </div>
            </div>
          </div>

          <SelectField label="Riding Experience" value={experience} options={experiences} onChange={setExperience} />

          {/* Safety note */}
          <div
            style={{
              background: "rgba(255,107,0,0.06)",
              border: "1px solid rgba(255,107,0,0.15)",
              borderRadius: 12,
              padding: "12px 14px",
              marginBottom: 24,
              display: "flex",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 16 }}>🛡️</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#999", lineHeight: 1.5 }}>
              Your emergency contact will be notified automatically if the SOS button is activated during a ride.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed CTA */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 24px 24px",
          background: "linear-gradient(to top, #0B0B0B 60%, transparent)",
        }}
      >
        <button
          onClick={canProceed ? onComplete : undefined}
          style={{
            width: "100%",
            background: canProceed ? "#FF6B00" : "#1A1A1A",
            border: "none",
            borderRadius: 14,
            padding: "18px",
            color: canProceed ? "#FFFFFF" : "#444",
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: canProceed ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.2s",
          }}
        >
          CREATE RIDER PROFILE
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
