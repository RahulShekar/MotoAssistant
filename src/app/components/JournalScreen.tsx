import { Share2, Download, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

interface JournalScreenProps {
  onBack: () => void;
}

const timeline = [
  {
    time: "6:30 AM",
    place: "Manali",
    desc: "Departed in clear skies. NH-3 smooth through the valley.",
    emoji: "🌅",
    temp: "12°C",
  },
  {
    time: "9:15 AM",
    place: "Rohtang Pass (3,978m)",
    desc: "First high pass conquered. Light clouds but views spectacular.",
    emoji: "🏔️",
    temp: "4°C",
  },
  {
    time: "11:45 AM",
    place: "Keylong",
    desc: "Fuel stop and chai break. Met fellow riders from Pune.",
    emoji: "☕",
    temp: "18°C",
  },
  {
    time: "2:30 PM",
    place: "Baralacha La (4,890m)",
    desc: "Crossed in light drizzle. Road slippery but manageable.",
    emoji: "🌧️",
    temp: "2°C",
  },
  {
    time: "5:00 PM",
    place: "Sarchu",
    desc: "Short rest at 4,253m. Moto advised hydration break.",
    emoji: "🏕️",
    temp: "8°C",
  },
  {
    time: "6:00 PM",
    place: "Leh, Ladakh",
    desc: "Goal achieved! 476 km, 11h 24m. Unforgettable.",
    emoji: "🏁",
    temp: "19°C",
  },
];

export function JournalScreen({ onBack }: JournalScreenProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        paddingBottom: 32,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "48px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          marginBottom: 20,
        }}
      >
        <div>
          <button
            onClick={onBack}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", gap: 4, marginBottom: 10, padding: 0 }}
          >
            <ChevronLeft size={16} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13 }}>Summary</span>
          </button>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.02em", lineHeight: 1.1 }}>
            THE MANALI–LEH
            <br />
            <span style={{ color: "#FF6B00" }}>EXPEDITION</span>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", marginTop: 6 }}>
            10 June 2026 · 476 km · 11h 24m
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px", cursor: "pointer", color: "#888" }}>
            <Share2 size={16} />
          </button>
          <button style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px", cursor: "pointer", color: "#888" }}>
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* AI-generated story */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: "0 20px", marginBottom: 24 }}
      >
        <div
          style={{
            background: "rgba(255,107,0,0.04)",
            border: "1px solid rgba(255,107,0,0.12)",
            borderRadius: 14,
            padding: "16px 18px",
          }}
        >
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#FF6B00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, fontWeight: 600 }}>
            AI-Generated Story
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#CCC", lineHeight: 1.8, margin: 0 }}>
            On the morning of June 10th, Arjun Singh set out from Manali on his Royal Enfield Himalayan, bound for Leh — the jewel of Ladakh.
            The NH-3 unfolded in all its magnificent glory: first the emerald Beas Valley, then the stark moonscapes of Lahaul.
            Six high passes, three fuel stops, and one brief shower later, the white-domed monasteries of Leh came into view.
            <em style={{ color: "#888" }}> 476 kilometres. One extraordinary road. A story worth telling.</em>
          </p>
        </div>
      </motion.div>

      {/* Route photos (Unsplash) */}
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          Route Photos
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {[
            { url: "https://images.unsplash.com/photo-1603873199424-647f81e51b38?w=200&h=140&fit=crop&auto=format", alt: "Mountain road Ladakh" },
            { url: "https://images.unsplash.com/photo-1699799678950-a6ec57b60884?w=200&h=140&fit=crop&auto=format", alt: "Rider on highway" },
            { url: "https://images.unsplash.com/photo-1669995036703-0bf993d260b2?w=200&h=140&fit=crop&auto=format", alt: "Himalayan landscape" },
          ].map((img, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: 140,
                height: 96,
                borderRadius: 10,
                overflow: "hidden",
                background: "#1A1A1A",
              }}
            >
              <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
          Ride Timeline
        </div>
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 1, background: "rgba(255,255,255,0.06)" }} />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}
            >
              {/* Node */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "#0B0B0B",
                  border: `1px solid ${i === 0 || i === timeline.length - 1 ? "#FF6B00" : "rgba(255,255,255,0.12)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 13,
                  zIndex: 1,
                  position: "relative",
                }}
              >
                {item.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{item.place}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#FF6B00" }}>{item.temp}</div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#444", marginBottom: 3 }}>{item.time}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Share CTA */}
      <div style={{ padding: "0 20px" }}>
        <button
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
          <Share2 size={18} />
          SHARE EXPEDITION
        </button>
        <button
          style={{
            width: "100%",
            marginTop: 10,
            background: "#151515",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "14px",
            color: "#888",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Download size={15} />
          Export PDF
        </button>
      </div>
    </div>
  );
}
