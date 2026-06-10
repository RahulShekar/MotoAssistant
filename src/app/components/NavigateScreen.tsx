import { useState } from "react";
import { Search, MapPin, Fuel, CloudRain, AlertTriangle, Clock, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface NavigateScreenProps {
  onStartRide: () => void;
}

const destinations = [
  { name: "Leh, Ladakh", distance: "476 km", days: 2, icon: "🏔️" },
  { name: "Spiti Valley, HP", distance: "312 km", days: 2, icon: "⛰️" },
  { name: "Manali, HP", distance: "289 km", days: 1, icon: "🌲" },
  { name: "Goa", distance: "1,840 km", days: 4, icon: "🏖️" },
];

const RouteDetail = ({ label, value, icon, color = "#888" }: { label: string; value: string; icon: React.ReactNode; color?: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <div style={{ color, width: 18 }}>{icon}</div>
    <div style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 13, color: "#888" }}>{label}</div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>{value}</div>
  </div>
);

export function NavigateScreen({ onStartRide }: NavigateScreenProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof destinations)[0] | null>(null);
  const [planGenerated, setPlanGenerated] = useState(false);

  const filtered = destinations.filter(
    (d) => !query || d.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (d: (typeof destinations)[0]) => {
    setSelected(d);
    setQuery(d.name);
    setPlanGenerated(false);
  };

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
          PLAN YOUR RIDE
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555" }}>
          Where are you headed?
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ position: "relative" }}>
          <Search size={16} color="#555" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input
            placeholder="Enter destination..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(null); setPlanGenerated(false); }}
            style={{
              width: "100%",
              background: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "14px 14px 14px 40px",
              color: "#FFFFFF",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Quick destinations (show when no selection) */}
      {!selected && (
        <div style={{ padding: "0 20px", marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Popular Expeditions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((d, i) => (
              <motion.button
                key={d.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleSelect(d)}
                style={{
                  background: "#151515",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 20 }}>{d.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#FFFFFF" }}>{d.name}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#555", marginTop: 2 }}>
                    {d.distance} · {d.days} day{d.days > 1 ? "s" : ""}
                  </div>
                </div>
                <MapPin size={14} color="#444" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Destination Details */}
      {selected && !planGenerated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "0 20px" }}
        >
          <div
            style={{
              background: "#151515",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "18px",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 24 }}>{selected.icon}</span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
                  {selected.name}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#FF6B00", marginTop: 2 }}>
                  {selected.distance} from Manali
                </div>
              </div>
            </div>

            <RouteDetail label="Total Distance" value={selected.distance} icon={<MapPin size={16} />} color="#FF6B00" />
            <RouteDetail label="Est. Ride Days" value={`${selected.days} days`} icon={<Clock size={16} />} color="#4FC3F7" />
            <RouteDetail label="Fuel Stops Needed" value="4 stops" icon={<Fuel size={16} />} color="#FFB300" />
            <RouteDetail label="Weather Summary" value="Mostly clear" icon={<CloudRain size={16} />} color="#00C853" />
            <RouteDetail label="Road Conditions" value="Good / Caution" icon={<AlertTriangle size={16} />} color="#FFB300" />
            <RouteDetail label="Depart by" value="6:30 AM" icon={<Clock size={16} />} color="#A78BFA" />
          </div>

          <button
            onClick={() => setPlanGenerated(true)}
            style={{
              width: "100%",
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
            GENERATE RIDE PLAN
            <ChevronRight size={18} />
          </button>
        </motion.div>
      )}

      {/* Generated Plan */}
      {planGenerated && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "0 20px" }}
        >
          <div
            style={{
              background: "rgba(255,107,0,0.06)",
              border: "1px solid rgba(255,107,0,0.2)",
              borderRadius: 14,
              padding: "16px",
              marginBottom: 12,
            }}
          >
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FF6B00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
              Moto's Ride Plan
            </div>
            {[
              { day: "Day 1", route: "Manali → Keylong → Jispa", dist: "118 km", note: "Acclimatize at Jispa (3,320m)" },
              { day: "Day 2", route: "Jispa → Sarchu → Pang", dist: "158 km", note: "Cross Baralacha La (4,890m)" },
              { day: "Day 3", route: "Pang → Tanglang La → Leh", dist: "200 km", note: "Highest motorable pass: 5,359m" },
            ].map((item, i) => (
              <div
                key={item.day}
                style={{
                  padding: "10px 0",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#FF6B00" }}>{item.day}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#888" }}>{item.dist}</span>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#DDD", marginBottom: 2 }}>{item.route}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555" }}>{item.note}</div>
              </div>
            ))}
          </div>

          <button
            onClick={onStartRide}
            style={{
              width: "100%",
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
              marginBottom: 10,
            }}
          >
            START NAVIGATION →
          </button>

          <button
            onClick={() => { setSelected(null); setQuery(""); setPlanGenerated(false); }}
            style={{
              width: "100%",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "14px",
              color: "#666",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Change Destination
          </button>
        </motion.div>
      )}
    </div>
  );
}
