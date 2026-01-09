"use client";

import { ErrorInfo } from "react";
import { StackFrame } from "./types";

interface ErrorOverlayProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onClose: () => void;
  parseStackTrace: (stack: string) => StackFrame[];
}

export function ErrorOverlay({
  error,
  errorInfo,
  onClose,
  parseStackTrace,
}: ErrorOverlayProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000",
        color: "#fff",
        zIndex: 9999,
        overflow: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#171717",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 600,
                color: "#ef4444",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Runtime Error
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={onClose}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#262626",
                  color: "#fff",
                  border: "1px solid #404040",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                Close
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#262626",
                  color: "#fff",
                  border: "1px solid #404040",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                Reload
              </button>
            </div>
          </div>

          {/* Error Message */}
          <div
            style={{
              padding: "16px",
              backgroundColor: "#0a0a0a",
              borderRadius: "6px",
              borderLeft: "3px solid #ef4444",
              marginBottom: "20px",
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                fontSize: "14px",
                lineHeight: "1.5",
                color: "#fca5a5",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {error?.message || error?.toString()}
            </pre>
          </div>

          {/* Stack Trace */}
          {error?.stack && (() => {
            const stackFrames = parseStackTrace(error.stack);
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#a3a3a3",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Call Stack
                  </h2>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#737373",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {stackFrames.length}
                  </span>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  {stackFrames.map((frame, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#0a0a0a",
                        borderRadius: "6px",
                        padding: "12px 16px",
                        border: "1px solid #262626",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                          fontSize: "13px",
                          color: "#d4d4d4",
                          marginBottom: "4px",
                        }}
                      >
                        {frame.function}
                      </div>
                      <div
                        style={{
                          fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                          fontSize: "12px",
                          color: "#737373",
                        }}
                      >
                        {frame.file} ({frame.line}:{frame.column})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Component Stack */}
        {errorInfo?.componentStack && (
          <div
            style={{
              backgroundColor: "#171717",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <h2
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                fontWeight: 600,
                color: "#a3a3a3",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Component Stack
            </h2>
            <div
              style={{
                backgroundColor: "#0a0a0a",
                borderRadius: "6px",
                padding: "16px",
                border: "1px solid #262626",
              }}
            >
              <pre
                style={{
                  margin: 0,
                  fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  color: "#d4d4d4",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  maxHeight: "300px",
                  overflow: "auto",
                }}
              >
                {errorInfo.componentStack}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
