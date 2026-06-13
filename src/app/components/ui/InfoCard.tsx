import React from "react";

export function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: "390px",
      marginLeft: "auto",
      marginRight: "auto",
      background: "#151515",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "16px",
      boxSizing: "border-box"
    }}>
      {children}
    </div>
  );
}
