import { Home, Map, Brain, Shield, User } from "lucide-react";

type Tab = "home" | "navigate" | "intelligence" | "readiness" | "profile";

interface BottomNavProps {
  active: Tab;
  onNavigate: (tab: Tab) => void;
}

const tabs = [
  { id: "home" as Tab, icon: Home, label: "Home" },
  { id: "navigate" as Tab, icon: Map, label: "Navigate" },
  { id: "intelligence" as Tab, icon: Brain, label: "Intel" },
  { id: "readiness" as Tab, icon: Shield, label: "Readiness" },
  { id: "profile" as Tab, icon: User, label: "Profile" },
];

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(11,11,11,0.96)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", height: 60 }}>
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isActive ? "#FF6B00" : "#555555",
                transition: "color 0.2s",
                minWidth: 52,
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: 32,
                    height: 2,
                    background: "#FF6B00",
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
