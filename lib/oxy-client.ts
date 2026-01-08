"use client"

import { initializeDuckDB, OxyClient } from "@oxy-hq/sdk"

let clientInstance: OxyClient | null = null

export async function getOxyClient(): Promise<OxyClient> {
  if (clientInstance) {
    return clientInstance
  }

  try {
    const projectId = process.env.NEXT_PUBLIC_OXY_PROJECT_ID || undefined
    const baseUrl = process.env.NEXT_PUBLIC_OXY_URL

    const parentOrigin =
      typeof window !== "undefined" && window.location.ancestorOrigins?.[0]
        ? window.location.ancestorOrigins[0]
        : "https://app.oxy.tech"

    clientInstance = await OxyClient.create({
      parentOrigin,
      ...(projectId && { projectId }), // Only include projectId if it exists
      baseUrl,
    })

    return clientInstance
  } catch (error) {
    console.error("[v0] Failed to initialize Oxy client:", error)
    throw new Error(`Failed to initialize Oxy client: ${(error as Error).message}`)
  }
}
// Initialize DuckDB for client-side usage
// Use when you need to run SQL queries with DuckDB in the browser
// or access parquet files directly from the client
export async function initializeDBClient() {
  try {
    await initializeDuckDB()
  } catch (error) {
    console.error("Failed to initialize DuckDB:", error)
    throw new Error(`Failed to initialize DuckDB: ${(error as Error).message}`)
  }
}
