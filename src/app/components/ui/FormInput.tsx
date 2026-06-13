import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export function FormInput({ label, error, className = "", ...rest }: Props) {
  return (
    <div style={{ width: "100%", maxWidth: "390px", marginLeft: "auto", marginRight: "auto" }}>
      {label ? (
        <div style={{
          fontSize: "11px",
          color: "#888",
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 600
        }}>
          {label}
        </div>
      ) : null}

      <input
        {...rest}
        style={{
          width: "100%",
          padding: "12px 14px",
          background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          color: "#FFFFFF",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
          ...(rest.style || {})
        }}
      />

      {error ? (
        <div style={{
          fontSize: "12px",
          color: "#FF6B7A",
          marginTop: "6px"
        }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
