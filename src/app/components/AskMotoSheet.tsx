import { useState } from "react";
import { X, Mic, MicOff } from "lucide-react";

const suggestions = [
  "Where is the next fuel station?",
  "Any rain ahead?",
  "Nearest mechanic?",
  "Distance remaining?",
  "How much fuel needed?",
  "Recommended rest stop?",
];

const responses: Record<string, string> = {
  "Where is the next fuel station?":
    "Next fuel station is 18 km ahead at Keylong HP Petrol Pump. Current range: 320 km. You have plenty of fuel to reach it safely.",
  "Any rain ahead?":
    "Light drizzle expected after Rohtang Pass in approximately 65 km, around 4:30 PM. Consider layering up at Gramphu.",
  "Nearest mechanic?":
    "Rajesh Motorcycle Workshop is 12 km ahead in Tandi. They specialize in Royal Enfield and KTM. Open till 7 PM.",
  "Distance remaining?":
    "You are 187 km from Leh. At your current pace of 45 km/h, ETA is 6:42 PM. Road conditions ahead are good.",
  "How much fuel needed?":
    "At your current mileage of 28 km/L, you need approximately 6.7 litres to reach Leh. Tank is 72% full — you're good.",
  "Recommended rest stop?":
    "Sarchu is 43 km ahead and has dhabas and basic accommodation. At altitude 4,253m, a 20-minute rest is recommended.",
};

interface AskMotoSheetProps {
  onClose: () => void;
}

export function AskMotoSheet({ onClose }: AskMotoSheetProps) {
  const [listening, setListening] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSuggestion = (s: string) => {
    setQuery(s);
    setTimeout(() => {
      setResponse(responses[s] || "Let me check that for you... All systems nominal. Stay safe on the road.");
    }, 600);
  };

  const handleMic = () => {
    setListening((v) => !v);
    if (!listening) {
      setTimeout(() => {
        setListening(false);
        setQuery("Any rain ahead?");
        setTimeout(() => {
          setResponse(responses["Any rain ahead?"]);
        }, 400);
      }, 2000);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#111111",
          borderRadius: "20px 20px 0 0",
          border: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "none",
          padding: "0 20px 32px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}>
          <div style={{ width: 36, height: 4, background: "#333", borderRadius: 2 }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#FF6B00", letterSpacing: "0.04em" }}>
              ASK MOTO
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666", marginTop: 2 }}>
              Your AI expedition companion
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "#1E1E1E", border: "none", borderRadius: 20, padding: 8, cursor: "pointer", color: "#888" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mic Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <button
            onClick={handleMic}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: listening ? "#FF6B00" : "#1E1E1E",
              border: `2px solid ${listening ? "#FF6B00" : "rgba(255,255,255,0.12)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: listening ? "0 0 0 12px rgba(255,107,0,0.15), 0 0 0 24px rgba(255,107,0,0.07)" : "none",
              transition: "all 0.3s",
            }}
          >
            {listening ? <MicOff size={32} color="#fff" /> : <Mic size={32} color="#FF6B00" />}
          </button>
        </div>

        {listening && (
          <div style={{ textAlign: "center", color: "#FF6B00", fontFamily: "var(--font-body)", fontSize: 13, marginBottom: 12 }}>
            Listening...
          </div>
        )}

        {/* Query display */}
        {query && (
          <div
            style={{
              background: "#1E1E1E",
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 12,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#fff",
              border: "1px solid rgba(255,107,0,0.2)",
            }}
          >
            <span style={{ color: "#FF6B00", marginRight: 6 }}>You:</span>
            {query}
          </div>
        )}

        {/* Moto Response */}
        {response && (
          <div
            style={{
              background: "rgba(255,107,0,0.06)",
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 16,
              border: "1px solid rgba(255,107,0,0.15)",
            }}
          >
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#FF6B00", marginBottom: 6, fontWeight: 600 }}>
              MOTO
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#E0E0E0", lineHeight: 1.6 }}>
              {response}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {!response && (
          <>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Quick Questions
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  style={{
                    background: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "11px 14px",
                    color: "#CCC",
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        {response && (
          <button
            onClick={() => { setQuery(""); setResponse(""); }}
            style={{
              width: "100%",
              background: "#1E1E1E",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "12px",
              color: "#888",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Ask something else
          </button>
        )}
      </div>
    </div>
  );
}
