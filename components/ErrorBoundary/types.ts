import { ErrorInfo } from "react";

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isOverlayOpen: boolean;
}

export interface StackFrame {
  function: string;
  file: string;
  fullPath: string;
  line: string;
  column: string;
  original: string;
}
