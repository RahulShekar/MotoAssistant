import React from "react";

export function SecondaryButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      style={{
        width: "100%",
        maxWidth: "390px",
        background: "#1A1A1A",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#CCC",
        fontFamily: "var(--font-body)",
        fontSize: "15px",
        fontWeight: 500,
        padding: "14px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "background 0.2s",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        ...(rest.style || {})
      }}
      className={rest.className || ""}
    >
      {children}
    </button>
  );
}
