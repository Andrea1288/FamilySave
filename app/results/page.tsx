"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BreakdownItem = {
  label: string;
  value: number;
};

export default function ResultsPage() {
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const parsed = {
      total: Number(params.get("total") || 0),
      home: Number(params.get("home") || 0),
      bills: Number(params.get("bills") || 0),
      food: Number(params.get("food") || 0),
      transport: Number(params.get("transport") || 0),
      kids: Number(params.get("kids") || 0),
      fun: Number(params.get("fun") || 0),
    };

    setTotal(parsed.total);

    setBreakdown(
      [
        { label: "🏠 Home", value: parsed.home },
        { label: "⚡ Bills", value: parsed.bills },
        { label: "🛒 Food", value: parsed.food },
        { label: "🚗 Transport", value: parsed.transport },
        { label: "👶 Kids", value: parsed.kids },
        { label: "🎉 Fun", value: parsed.fun },
      ].filter((item) => item.value > 0)
    );
  }, []);

  const biggest = [...breakdown].sort((a, b) => b.value - a.value)[0];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">🎉 Good news!</h1>

        <p className="text-gray-600 mb-1">
          Your family could save about
        </p>

        <p className="text-4xl font-bold text-blue-600 mb-2">
          £{total} per month
        </p>

        {/* 🔑 ONE-LINER EXPLANATION */}
        <p className="text-sm text-gray-500 mb-6">
          Some savings happen now. Others happen over time when contracts end — this shows what’s realistically achievable.
        </p>

        {/* Breakdown */}
        <div className="text-left mb-6">
          <p className="font-semibold mb-3">
            Where the savings come from
          </p>

          {breakdown.map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span>{item.label}</span>
              <span className="font-medium">£{item.value}</span>
            </div>
          ))}
        </div>

        {/* AI Explanation */}
        {biggest && (
          <div className="bg-blue-50 rounded-xl p-4 text-left mb-6">
            <p className="font-semibold mb-1">
              🤖 Why you can save this much
            </p>
            <p className="text-sm text-gray-700">
              {generateInsight(biggest)}
            </p>
          </div>
        )}

        {/* Premium */}
        <div className="border border-dashed border-blue-300 rounded-xl p-4 mb-6 text-left">
          <p className="font-semibold mb-1">
            🔓 Unlock smarter savings
          </p>
          <p className="text-sm text-gray-700 mb-3">
            Get personalised tips, monthly tracking, and alerts when bills can be reduced.
          </p>
          <button
            onClick={() => alert("Premium coming soon 🙂")}
            className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg font-medium"
          >
            Try Premium – £4.99/month
          </button>
        </div>

        {/* Restart */}
        <button
          onClick={() => router.push("/family")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg"
        >
          Start again
        </button>
      </div>
    </main>
  );
}

/* ---------- AI explanation ---------- */

function generateInsight(biggest: BreakdownItem) {
  if (biggest.label.includes("Food")) {
    return `You spend more on food than most similar families. This often comes from takeaways or unplanned shopping. Small weekly changes could save you £${biggest.value} every month.`;
  }

  if (biggest.label.includes("Bills")) {
    return `Your bills are higher than average. Many families save this amount by switching providers when contracts end. That could free up £${biggest.value} per month.`;
  }

  if (biggest.label.includes("Transport")) {
    return `Transport costs often hide small leaks like insurance renewals or inefficient routes. Reviewing these could save around £${biggest.value} per month.`;
  }

  if (biggest.label.includes("Fun")) {
    return `Fun spending grows quietly over time. Setting gentle limits could help you keep enjoying life while saving £${biggest.value} each month.`;
  }

  return `This category shows a realistic opportunity to save about £${biggest.value} per month with manageable changes.`;
}
