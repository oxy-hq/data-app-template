"use client"

import { OxyClient } from "@oxy-hq/sdk"

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
