"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch soon.");
        setEmail("");
        setCount(data.count);
      } else if (res.status === 409) {
        setStatus("duplicate");
        setMessage("This email is already registered.");
        if (data.count !== undefined) setCount(data.count);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 px-4">
      {/* Logo / Brand */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="text-5xl">🔥🏃</div>
        <h1 className="text-4xl font-extrabold tracking-tight text-orange-700 sm:text-5xl">
          Grill &amp; Run Inc.
        </h1>
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
          Something hot is coming
        </p>
      </div>

      {/* Tagline */}
      <p className="max-w-md text-center text-lg text-gray-600 mb-10">
        We&apos;re building a product that blends the thrill of the grill with the rush of the run.
        Be the first to know when we launch.
      </p>

      {/* Email Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 rounded-full border border-orange-300 bg-white px-5 py-3 text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-orange-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:opacity-50"
        >
          {status === "loading" ? "Joining…" : "Notify Me"}
        </button>
      </form>

      {/* Feedback message */}
      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            status === "success"
              ? "text-green-600"
              : status === "duplicate"
              ? "text-yellow-600"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* Counter */}
      <div className="mt-12 flex flex-col items-center gap-1">
        <span className="text-5xl font-extrabold text-orange-600">
          {count !== null ? count.toLocaleString() : "—"}
        </span>
        <span className="text-sm font-medium uppercase tracking-widest text-gray-500">
          people waiting
        </span>
      </div>

      {/* Footer */}
      <p className="mt-16 text-xs text-gray-400">
        © {new Date().getFullYear()} Grill &amp; Run Inc. All rights reserved.
      </p>
    </div>
  );
}
