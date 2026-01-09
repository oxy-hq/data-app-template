"use client";

import { OxyProvider } from "@oxy-hq/sdk";
import { Dashboard } from "./Dashboard";

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

export function DataApp() {
  return (
    <OxyProvider files={FILE_PATHS} useAsync>
      <Dashboard />
    </OxyProvider>
  );
}
