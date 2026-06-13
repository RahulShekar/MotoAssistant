import { useEffect } from "react";
import { motion } from "motion/react";
import { ScreenWrapper } from "./ui/ScreenWrapper";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#0B0B0B" }}>
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1669995036703-0bf993d260b2?w=390&h=844&fit=crop&auto=format"
        alt="Motorcycle rider on mountain road"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.55,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(11,11,11,1) 0%, rgba(11,11,11,0.6) 40%, rgba(11,11,11,0.2) 100%)",
        }}
      />

      {/* Orange vignette top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, rgba(255,107,0,0.15), transparent)",
        }}
      />

      {/* Content - centered by ScreenWrapper */}
      <ScreenWrapper>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", paddingBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textAlign: "center" }}
          >
          {/* Logo mark */}
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "rgba(255,107,0,0.15)",
                border: "1.5px solid rgba(255,107,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <circle cx="17" cy="17" r="12" stroke="#FF6B00" strokeWidth="2" />
                <circle cx="17" cy="17" r="5" fill="#FF6B00" />
                <path d="M17 5 L17 1" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 33 L17 29" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 17 L1 17" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                <path d="M33 17 L29 17" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 9 L6 6" stroke="rgba(255,107,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 28 L25 25" stroke="rgba(255,107,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 25 L6 28" stroke="rgba(255,107,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 6 L25 9" stroke="rgba(255,107,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 52,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "0.06em",
              lineHeight: 1,
              marginBottom: 10,
            }}
          >
            MOTO<span style={{ color: "#FF6B00" }}>OS</span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            AI FOR MOTORCYCLE EXPEDITIONS
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: 40 }}
        >
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B00" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </ScreenWrapper>
    </div>
  );
}
