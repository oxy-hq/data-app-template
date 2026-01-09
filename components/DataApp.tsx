"use client";

import { OxyProvider } from "@oxy-hq/sdk";
import { Dashboard } from "./Dashboard";
import { ErrorBoundary } from "./ErrorBoundary";

const FILE_PATHS = {
  /**
   * Fill in with your own file paths
   * e.g.
   * {
   *   table1: "path/to/your/file1.parquet",
   *   table2: "path/to/your/file2.parquet",
   * }
   */
};

// Oxy SDK document: https://www.npmjs.com/package/@oxy-hq/sdk
export function DataApp() {
  return (
    <ErrorBoundary>
      <OxyProvider files={FILE_PATHS} useAsync>
        <Dashboard />
      </OxyProvider>
    </ErrorBoundary>
  );
}
