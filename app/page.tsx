"use client";

import { useEffect, useRef, useState } from "react";

const GAME_W = 800;
const GAME_H = 450;
const BORDER = 4; // 2px border each side
const FRAME_W = GAME_W + BORDER;
const FRAME_H = GAME_H + BORDER;

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      if (wrapperRef.current) {
        const available = wrapperRef.current.offsetWidth;
        setScale(Math.min(1, available / FRAME_W));
      }
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a2e] px-4 py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center gap-1 text-center">
        <div className="text-4xl">🔥🏃</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400 font-mono sm:text-4xl">
          Grill &amp; Run Inc.
        </h1>
        <p className="text-sm text-orange-300 font-mono uppercase tracking-widest">
          American Weekend Vacation
        </p>
      </div>

      {/* Outer wrapper sets the visual size; inner is absolute so it never
          causes layout overflow → no scrollbars on any screen size */}
      <div
        ref={wrapperRef}
        className="w-full relative overflow-hidden"
        style={{
          maxWidth: `${FRAME_W}px`,
          height: `${FRAME_H * scale}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${FRAME_W}px`,
            height: `${FRAME_H}px`,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            src="/game.html"
            width={FRAME_W}
            height={FRAME_H}
            className="block border-2 border-[#444] rounded"
            style={{ width: `${FRAME_W}px`, height: `${FRAME_H}px` }}
            title="Grill and Run Game"
          />
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-600 font-mono">
        © {new Date().getFullYear()} Grill &amp; Run Inc. All rights reserved.
      </p>
    </div>
  );
}
