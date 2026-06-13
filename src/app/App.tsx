import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, AlertOctagon } from "lucide-react";

import { useJourney } from "./context/JourneyContext";
import { analyzeJourney } from "./services/api";
import { MobileNumberScreen } from "./components/ui/MobileNumberScreen";
import { OTPVerificationScreen } from "./components/ui/OTPVerificationScreen";
import { JourneySetupScreen } from "./components/ui/JourneySetupScreen";
import { JourneyAnalysisScreen } from "./components/ui/JourneyAnalysisScreen";

import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RiderSetupScreen } from "./components/RiderSetupScreen";
import { HomeDashboard } from "./components/HomeDashboard";
import { NavigateScreen } from "./components/NavigateScreen";
import { ReadinessScreen } from "./components/ReadinessScreen";
import { IntelligenceScreen } from "./components/IntelligenceScreen";
import { NavigationMapScreen } from "./components/NavigationMapScreen";
import { AlertScreen } from "./components/AlertScreen";
import { EmergencyScreen } from "./components/EmergencyScreen";
import { SummaryScreen } from "./components/SummaryScreen";
import { JournalScreen } from "./components/JournalScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { BottomNav } from "./components/BottomNav";
import { AskMotoSheet } from "./components/AskMotoSheet";

type Screen =
  | "splash"
  | "login"
  | "mobile-number"
  | "otp"
  | "setup"
  | "journey-setup"
  | "journey-analysis"
  | "home"
  | "navigate"
  | "readiness"
  | "intelligence"
  | "navigation-map"
  | "summary"
  | "journal"
  | "profile"
  | "settings";

type Tab = "home" | "navigate" | "intelligence" | "readiness" | "profile";

const tabToScreen: Record<Tab, Screen> = {
  home: "home",
  navigate: "navigate",
  intelligence: "intelligence",
  readiness: "readiness",
  profile: "profile",
};

const screenToTab: Partial<Record<Screen, Tab>> = {
  home: "home",
  navigate: "navigate",
  intelligence: "intelligence",
  readiness: "readiness",
  profile: "profile",
};

const SHOW_BOTTOM_NAV: Screen[] = ["home", "navigate", "readiness", "intelligence", "profile"];
const SHOW_FAB: Screen[] = ["home", "navigate", "readiness", "intelligence", "profile"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [showAlert, setShowAlert] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showAskMoto, setShowAskMoto] = useState(false);
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const { setJourneyData } = useJourney();
  const { currentRider } = useJourney();

  const navigate = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  // Removed Auto-trigger alert

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onDone={() => navigate("login")} />;
      case "login":
  return (
    <LoginScreen
      onLogin={() => navigate("setup")}
    />
  );
  case "mobile-number":
  return (
    <MobileNumberScreen
      onSendOTP={() => navigate("otp")}
    />
  );
      case "otp":
      return (
    <OTPVerificationScreen
      onVerify={() => navigate("setup")}
    />
    );
      case "setup":
  return (
    <RiderSetupScreen
      onComplete={() => navigate("journey-setup")}
    />
    );
    case "journey-setup":
      return (
        <JourneySetupScreen
          onAnalyze={async (payload) => {
            setAnalysisError("");
            setIsAnalyzing(true);
            try {
              const payloadWithRider = {
                ...payload,
                riderId: currentRider?.id,
              };

              const result = await analyzeJourney(payloadWithRider);
              setJourneyData(result);
              navigate("home");
            } catch (error) {
              setAnalysisError(
                error instanceof Error
                  ? error.message
                  : "Unable to analyze journey"
              );
            } finally {
              setIsAnalyzing(false);
            }
          }}
          isAnalyzing={isAnalyzing}
          error={analysisError}
        />
      );
    case "journey-analysis":
      return (
        <JourneyAnalysisScreen
          onStartExpedition={() => navigate("home")}
        />
      );

case "home":
  return (
    <HomeDashboard
      onStartRide={() => navigate("navigation-map")}
      onNavigate={(tab) => {
        if (
          tab === "home" ||
          tab === "navigate" ||
          tab === "intelligence" ||
          tab === "readiness" ||
          tab === "profile"
        ) {
          navigate(tabToScreen[tab as Tab]);
        }
      }}
    />
  );

case "navigate":
        return <NavigateScreen onStartRide={() => navigate("navigation-map")} />;
      case "readiness":
        return <ReadinessScreen />;
      case "intelligence":
        return <IntelligenceScreen />;
      case "navigation-map":
        return (
          <NavigationMapScreen
            onAskMoto={() => setShowAskMoto(true)}
            onAlert={() => setShowAlert(true)}
            onEmergency={() => setShowEmergency(true)}
          />
        );
      case "summary":
        return <SummaryScreen onJournal={() => navigate("journal")} onHome={() => navigate("home")} />;
      case "journal":
        return <JournalScreen onBack={() => navigate("summary")} />;
      case "profile":
        return <ProfileScreen onSettings={() => navigate("settings")} />;
      case "settings":
        return <SettingsScreen onBack={() => navigate("profile")} />;
      default:
        return null;
    }
  };

  const activeTab = screenToTab[screen] ?? "home";
  const showNav = SHOW_BOTTOM_NAV.includes(screen);
  const showFAB = SHOW_FAB.includes(screen);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      {/* Mobile phone frame */}
      <div
        style={{
          width: 390,
          height: 844,
          background: "#0B0B0B",
          borderRadius: 44,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)",
          flexShrink: 0,
        }}
      >
        {/* Dynamic island / notch */}
        {screen !== "splash" && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 34,
              background: "#000",
              borderRadius: 20,
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1A1A1A" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#333" }} />
          </div>
        )}

        {/* Screen content */}
        <AnimatePresence mode="wait">
          <motion.div
    key={screen}
    initial={{ opacity: 0, y: screen === "splash" ? 0 : 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    style={{
    width: "100%",
    height: "100%",
    paddingTop: screen === "splash" ? 0 : 60,
    overflow: "hidden",
      }}
>
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Nav */}
        {showNav && (
          <BottomNav
            active={activeTab}
            onNavigate={(tab) => navigate(tabToScreen[tab])}
          />
        )}

        {/* Floating Ask Moto FAB (on main tabs, not navigation map) */}
        {showFAB && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            onClick={() => setShowAskMoto(true)}
            style={{
              position: "absolute",
              bottom: showNav ? `calc(76px + env(safe-area-inset-bottom, 8px))` : `calc(24px + env(safe-area-inset-bottom, 8px))`,
              right: 16,
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#FF6B00",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 45,
              boxShadow: "0 4px 20px rgba(255,107,0,0.45)",
              gap: 1,
            }}
          >
            <Mic size={18} color="#fff" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 7, color: "rgba(255,255,255,0.8)", letterSpacing: "0.06em" }}>
              MOTO
            </span>
          </motion.button>
        )}

        {/* SOS button (always visible during ride) */}
        {screen !== "splash" && screen !== "login" && screen !== "otp" && screen !== "setup" && screen !== "journey-setup" && screen !== "journey-analysis" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => setShowEmergency(true)}
            style={{
              position: "absolute",
              bottom: showNav ? `calc(76px + env(safe-area-inset-bottom, 8px))` : `calc(24px + env(safe-area-inset-bottom, 8px))`,
              left: 16,
              background: "rgba(255,61,0,0.1)",
              border: "1px solid rgba(255,61,0,0.25)",
              borderRadius: 8,
              padding: "5px 10px",
              cursor: "pointer",
              zIndex: 45,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <AlertOctagon size={12} color="#FF3D00" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "#FF3D00" }}>
              SOS
            </span>
          </motion.button>
        )}

        {/* Navigation-map end ride / go home */}
        {screen === "navigation-map" && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate("summary")}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "rgba(11,11,11,0.85)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              padding: "7px 14px",
              cursor: "pointer",
              zIndex: 25,
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "#888",
            }}
          >
            ✕ End Ride
          </motion.button>
        )}

        {/* Alert overlay */}
        <AnimatePresence>
          {showAlert && (
            <AlertScreen
              onDismiss={() => setShowAlert(false)}
              onViewRoute={() => setShowAlert(false)}
            />
          )}
        </AnimatePresence>

        {/* Emergency overlay */}
        <AnimatePresence>
          {showEmergency && (
            <EmergencyScreen onClose={() => setShowEmergency(false)} />
          )}
        </AnimatePresence>

        {/* Ask Moto sheet */}
        <AnimatePresence>
          {showAskMoto && (
            <AskMotoSheet onClose={() => setShowAskMoto(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Screen label below phone */}
      <div
        style={{
          position: "fixed",
          bottom: `calc(16px + env(safe-area-inset-bottom, 8px))`,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        MOTOOS · {screen.replace("-", " ")}
      </div>
    </div>
  );
}
