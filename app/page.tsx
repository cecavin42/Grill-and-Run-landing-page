export default function Home() {
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

      {/* The wrapper uses aspect-ratio so the iframe always has the correct
          height. The canvas inside game.html uses max-width:100% / height:auto
          so it scales with the iframe — no CSS transforms, no coordinate
          corruption, clicks always land at the right canvas position. */}
      <div
        className="w-full"
        style={{ maxWidth: "804px", aspectRatio: "804 / 454" }}
      >
        <iframe
          src="/game.html"
          className="block w-full h-full rounded"
          style={{ border: "none" }}
          title="Grill and Run Game"
        />
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-600 font-mono">
        © {new Date().getFullYear()} Grill &amp; Run Inc. All rights reserved.
      </p>
    </div>
  );
}
