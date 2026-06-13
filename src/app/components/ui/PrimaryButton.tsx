import React from "react";

export function PrimaryButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      style={{
        width: "100%",
        maxWidth: "390px",
        background: "#FF6B00",
        border: "none",
        color: "#FFFFFF",
        fontFamily: "var(--font-display)",
        fontSize: "16px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        padding: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "background 0.2s",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        opacity: rest.disabled ? 0.5 : 1,
        ...(rest.style || {})
      }}
      className={rest.className || ""}
    >
      {children}
    </button>
  );
}
