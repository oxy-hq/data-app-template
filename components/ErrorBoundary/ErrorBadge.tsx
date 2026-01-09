"use client";

interface ErrorBadgeProps {
  onClick: () => void;
}

export function ErrorBadge({ onClick }: ErrorBadgeProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 16px",
        backgroundColor: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: 9998,
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          backgroundColor: "#fff",
          color: "#ef4444",
          borderRadius: "50%",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        1
      </span>
      <span>Error</span>
    </button>
  );
}
