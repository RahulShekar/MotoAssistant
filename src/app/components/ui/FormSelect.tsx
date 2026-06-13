import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function FormSelect({ label, className = "", children, ...rest }: Props) {
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

      <select
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
          appearance: "none",
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23888888\" stroke-width=\"2\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "18px",
          paddingRight: "40px",
          ...(rest.style || {})
        }}
      >
        {children}
      </select>
    </div>
  );
}
