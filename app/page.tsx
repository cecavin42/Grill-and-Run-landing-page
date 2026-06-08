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

      {/* Game iframe */}
      <div className="w-full overflow-x-auto flex justify-center">
        <iframe
          src="/game.html"
          width="804"
          height="454"
          className="block flex-shrink-0 border-2 border-[#444] rounded"
          style={{ width: '804px', height: '454px' }}
          title="Grill and Run Game"
        />
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-600 font-mono">
        © {new Date().getFullYear()} Grill &amp; Run Inc. All rights reserved.
      </p>
    </div>
  );
}
