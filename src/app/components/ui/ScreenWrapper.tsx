import React from "react";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <div style={{
      height: "100%",
      overflowY: "auto",
      background: "#0B0B0B",
      color: "#FFFFFF"
    }}>
      <div style={{
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "24px",
        paddingBottom: "128px",
        width: "100%",
        maxWidth: "390px",
        marginLeft: "auto",
        marginRight: "auto",
        boxSizing: "border-box"
      }}>
        {children}
      </div>
    </div>
  );
}