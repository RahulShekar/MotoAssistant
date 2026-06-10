import { motion } from "motion/react";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column",
        padding: "60px 28px 40px",
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 48 }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 40,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "0.06em",
          }}
        >
          MOTO<span style={{ color: "#FF6B00" }}>OS</span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#555",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          AI Expedition Companion
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ marginBottom: 40 }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 34,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          START YOUR<br />EXPEDITION
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#666", lineHeight: 1.6 }}>
          Your intelligent riding companion for every road ahead.
        </div>
      </motion.div>

      {/* Auth buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {/* Google */}
        <button
          onClick={onLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            padding: "16px 20px",
            cursor: "pointer",
            color: "#FFFFFF",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Apple */}
        <button
          onClick={onLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            padding: "16px 20px",
            cursor: "pointer",
            color: "#FFFFFF",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
          </svg>
          Continue with Apple
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#444" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Phone */}
        <button
          onClick={onLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "rgba(255,107,0,0.1)",
            border: "1px solid rgba(255,107,0,0.3)",
            borderRadius: 14,
            padding: "16px 20px",
            cursor: "pointer",
            color: "#FF6B00",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          Mobile Number with OTP
        </button>

        {/* Primary CTA */}
        <button
          onClick={onLogin}
          style={{
            background: "#FF6B00",
            border: "none",
            borderRadius: 14,
            padding: "18px 20px",
            cursor: "pointer",
            color: "#FFFFFF",
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.06em",
            marginTop: 8,
          }}
        >
          GET STARTED
        </button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          marginTop: "auto",
          paddingTop: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.06em",
            fontStyle: "italic",
          }}
        >
          "Your expedition begins here."
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#333", marginTop: 12 }}>
          By continuing you agree to our Terms & Privacy Policy
        </div>
      </motion.div>
    </div>
  );
}
