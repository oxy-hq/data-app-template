"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorBoundaryState, StackFrame } from "./types";
import { ErrorBadge } from "./ErrorBadge";
import { ErrorOverlay } from "./ErrorOverlay";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isOverlayOpen: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null, isOverlayOpen: false };
  }

  componentDidMount() {
    // Handle uncaught JavaScript errors
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Global error:", error || message);
      if (error) {
        this.setState({
          hasError: true,
          error,
          errorInfo: null,
          isOverlayOpen: false,
        });
      } else {
        // Create error object from message if error object not available
        const syntheticError = new Error(message as string);
        syntheticError.stack = `Error: ${message}\n    at ${source}:${lineno}:${colno}`;
        this.setState({
          hasError: true,
          error: syntheticError,
          errorInfo: null,
          isOverlayOpen: false,
        });
      }
      return true; // Prevent default browser error handling
    };

    // Handle unhandled promise rejections
    window.onunhandledrejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      const error =
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason));
      this.setState({
        hasError: true,
        error,
        errorInfo: null,
        isOverlayOpen: false,
      });
      event.preventDefault(); // Prevent default browser error handling
    };

    // Handle Escape key to close overlay
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.state.isOverlayOpen) {
      this.setState({ isOverlayOpen: false });
    }
  };

  componentWillUnmount() {
    // Clean up event listeners
    window.onerror = null;
    window.onunhandledrejection = null;
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  parseStackTrace = (stack: string): StackFrame[] => {
    const lines = stack.split("\n").slice(1); // Skip the error message line
    return lines
      .map((line) => {
        // Parse patterns like: "at ComponentName (file.tsx:line:col)" or "at file.tsx:line:col"
        const match = line.match(/at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?/);
        if (match) {
          const [, functionName, file, lineNum, col] = match;
          const fileName = file.split("/").pop() || file;
          return {
            function: functionName?.trim() || "anonymous",
            file: fileName,
            fullPath: file,
            line: lineNum,
            column: col,
            original: line.trim(),
          };
        }
        return null;
      })
      .filter(Boolean) as StackFrame[];
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Show badge button when overlay is closed
      if (!this.state.isOverlayOpen) {
        return (
          <>
            {this.props.children}
            <ErrorBadge onClick={() => this.setState({ isOverlayOpen: true })} />
          </>
        );
      }

      // Show full overlay when opened
      return (
        <ErrorOverlay
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onClose={() => this.setState({ isOverlayOpen: false })}
          parseStackTrace={this.parseStackTrace}
        />
      );
    }

    return this.props.children;
  }
}
