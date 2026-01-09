"use client";

import { useEffect, useState } from "react";

/**
 * Modern placeholder dashboard inspired by Oxygen Intelligence
 * to use Oxy SDK, refer to https://www.npmjs.com/package/@oxy-hq/sdk
 */
export function Dashboard() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                Building Your
                <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-xl">
                Oxy is preparing your enterprise AI and data solution. Your
                dashboard will be ready shortly.
              </p>
            </div>

            {/* Status message */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
                <div className="relative">
                  <div className="w-2 h-2 bg-purple-400 rounded-full pulse-glow" />
                </div>
                <span className="text-sm text-purple-300">
                  Generating dashboard{dots}
                </span>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">
                      Dashboard Configuration in Progress
                    </p>
                    <p className="text-sm text-gray-400">
                      You are seeing this page because your dashboard is
                      currently being generated. Please wait while we set up
                      your environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl backdrop-blur-sm">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span className="text-gray-300">Version: 0.1.0</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span className="text-gray-300">SDK: @oxy-hq/sdk ^0.2.5</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <a
                    href="https://www.npmjs.com/package/@oxy-hq/sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors underline"
                  >
                    View Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - 3D Element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Glowing orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Center glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-violet-500 to-blue-500 rounded-full blur-3xl opacity-60 pulse-glow" />

                  {/* Rotating rings */}
                  <div className="absolute inset-0 rotate-slow">
                    <div className="absolute inset-8 border-2 border-purple-400/30 rounded-full" />
                    <div className="absolute inset-16 border-2 border-blue-400/30 rounded-full" />
                  </div>

                  {/* Center element */}
                  <div className="absolute inset-0 flex items-center justify-center float">
                    <div className="relative">
                      {/* Cross shape with glow */}
                      <div className="relative w-32 h-32">
                        {/* Vertical bar */}
                        <div className="absolute left-1/2 top-0 w-12 h-full -translate-x-1/2 bg-gradient-to-b from-purple-400 via-violet-400 to-blue-400 rounded-full blur-sm" />
                        {/* Horizontal bar */}
                        <div className="absolute top-1/2 left-0 w-full h-12 -translate-y-1/2 bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 rounded-full blur-sm" />
                        {/* Solid overlay */}
                        <div className="absolute left-1/2 top-0 w-10 h-full -translate-x-1/2 bg-gradient-to-b from-purple-500 via-violet-500 to-blue-500 rounded-full" />
                        <div className="absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 rounded-full" />
                        {/* Center highlight */}
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-xl opacity-60" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
